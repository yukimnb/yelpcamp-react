export const ListPage = () => {
  return (
    <>
      <div id="cluster-map" className="mb-3"></div>
      <h1>キャンプ場一覧</h1>
      {/* 取得データをfor文で展開する */}
      <div className="card mb-3">
        <div className="row">
          <div className="col-lg-4">
            <img src="{{ campground.image1.url }}" alt="" className="w-100 h-100" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">campground.title</h5>
              <p className="card-text">campground.description|truncatechars:80</p>
              <p className="card-text">
                <small className="text-muted">campground.location</small>
              </p>
              <a className="btn btn-primary" href="{% url 'campgrounds:detail' campground.id %}">
                campground.titleの詳細
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* スクリプトを埋め込む */}
      {/* <script>
    const mapboxToken = "{{ mapbox_token }}";
    const campgroundsJson = {{ campgrounds_json|safe }}; </script>
    <script src="{% static 'js/clusterMap.js' %}"></script> */}
    </>
  );
};
