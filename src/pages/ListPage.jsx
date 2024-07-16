import { useQuery } from "react-query";
import { getCampgroundsList } from "../utils/campgroundAPI";
import { Link } from "react-router-dom";
import { ClusterMap } from "../components/ClusterMap";

export const ListPage = () => {
  const { data, error, isLoading, isError, isSuccess } = useQuery("list", getCampgroundsList);
  let newData = [];
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (isSuccess) {
    newData = data.map((object) => {
      object.properties = { title: object.title };
      return object;
    });
  }

  return (
    <>
      <ClusterMap newData={newData} />
      <h1>キャンプ場一覧</h1>
      {data &&
        data
          .sort((a, b) => b.id - a.id)
          .map((object) => (
            <div className="card mb-3" key={object.title}>
              <div className="row">
                <div className="col-lg-4">
                  <img src={object.image1} alt="" className="w-100 h-100" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{object.title}</h5>
                    <p className="card-text">{object.description}</p>
                    <p className="card-text">
                      <small className="text-muted">{object.location}</small>
                    </p>
                    <Link to={`/campgrounds/${object.id}`} className="btn btn-primary">
                      {object.title}の詳細
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};
