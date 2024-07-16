import { useRef, useEffect } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const ClusterMap = ({ newData }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [138, 39],
        zoom: 4,
      });
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      map.on("load", () => {
        // Add a new source from our GeoJSON data and
        // set the 'cluster' option to true. GL-JS will
        // add the point_count property to your source data.
        map.addSource("campgrounds", {
          type: "geojson",
          data: {
            features: newData,
          },
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "campgrounds",
          filter: ["has", "point_count"],
          paint: {
            // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": ["step", ["get", "point_count"], "#f1f075", 5, "#51bbd6", 10, "#f28cb1"],
            "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 20, 25],
          },
        });

        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "campgrounds",
          filter: ["has", "point_count"],
          layout: {
            "text-field": ["get", "point_count_abbreviated"],
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
        });

        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "campgrounds",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "brown",
            "circle-radius": 6,
            // "circle-stroke-width": 1,
            // "circle-stroke-color": "#fff",
          },
        });

        // inspect a cluster on click
        map.on("click", "clusters", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features[0].properties.cluster_id;
          map.getSource("campgrounds").getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.on("click", "unclustered-point", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { id } = e.features[0];
          const { title } = e.features[0].properties;

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup().setLngLat(coordinates).setHTML(`<a href=/campgrounds/${id}>${title}</a>`).addTo(map);
        });

        map.on("mouseenter", "clusters", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "clusters", () => {
          map.getCanvas().style.cursor = "";
        });
      });

      // Clean up on unmount
      return () => {
        if (map) map.remove();
      };
    }
  }, [newData]);
  return <StyledDiv ref={mapContainerRef} />;
};

const StyledDiv = styled.div`
  width: 100%;
  height: 500px;
  margin-bottom: 1rem;
`;

ClusterMap.propTypes = {
  newData: PropTypes.arrayOf(PropTypes.object),
};
