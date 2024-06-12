import { useQuery } from "react-query";
import { getCampgroundsList } from "../utils/api";

export const ListPage = () => {
  const { data, error, isLoading, isError } = useQuery("list", getCampgroundsList);
  console.log(data);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div id="cluster-map" className="mb-3"></div>
      <h1>キャンプ場一覧</h1>
      {/* 取得データをfor文で展開する */}
      {data && data.map((obj) => (
        <div className="card mb-3" key={obj.title}>
          <div className="row">
            <div className="col-lg-4">
              <img src={obj.image1} alt="" className="w-100 h-100" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{obj.title}</h5>
                <p className="card-text">{obj.description}</p>
                <p className="card-text">
                  <small className="text-muted">{obj.location}</small>
                </p>
                <a className="btn btn-primary" href="">
                  campground.titleの詳細
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* スクリプトを埋め込む */}
      {/* <script>
    const mapboxToken = "{{ mapbox_token }}";
    const campgroundsJson = {{ campgrounds_json|safe }}; </script>
    <script src="{% static 'js/clusterMap.js' %}"></script> */}
    </>
  );
};
