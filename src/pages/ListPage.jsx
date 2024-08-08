import { useState } from "react";
import { useQuery } from "react-query";
import { getCampgroundsList } from "../apis/campground-api";
import { Link } from "react-router-dom";
import { ClusterMap } from "../components/ClusterMap";
import { useErrorBoundary } from "react-error-boundary";

export const ListPage = () => {
  const [desc, setDesc] = useState(false);
  const { showBoundary } = useErrorBoundary();

  const { data, isSuccess } = useQuery("list", getCampgroundsList, {
    onSuccess: (data) => {
      data.map((object) => {
        object.properties = { title: object.title };
        return object;
      });
      return data;
    },
    onError: (error) => {
      showBoundary(error);
    },
  });

  const handleSort = () => {
    data.sort((a, b) => {
      if (desc) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setDesc((prev) => !prev);
  };

  return (
    <>
      <ClusterMap newData={data} />
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1>キャンプ場一覧</h1>
        <button onClick={handleSort} className="btn btn-danger">
          ↑↓ {desc ? "古い順に並び替え" : "新しい順に並び替え"}
        </button>
      </div>
      {isSuccess &&
        data.map((object) => (
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
