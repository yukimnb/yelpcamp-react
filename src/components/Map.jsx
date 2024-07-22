import { useRef, useEffect } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const Map = ({ geometry, location }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/outdoors-v12", // style URL
        center: geometry.coordinates,
        zoom: 9,
      });

      new mapboxgl.Marker({ color: "red" })
        .setLngLat(geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 30 }).setText(location))
        .addTo(map);

      // Clean up on unmount
      return () => {
        if (map) map.remove();
      };
    }
  }, [geometry, location]);
  return <StyledDiv ref={mapContainerRef} />;
};

const StyledDiv = styled.div`
  width: 100%;
  height: 300px;
`;

Map.propTypes = {
  geometry: PropTypes.object,
  location: PropTypes.string,
};
