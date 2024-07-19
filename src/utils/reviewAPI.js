import axios from "axios";

const ENDPOINT_URL = "http://localhost:8000/api/v1/";

export const getReview = async (id) => {
  const res = await axios.get(ENDPOINT_URL + `campgrounds/${id}/reviews/`);
  if (res.status !== 200) {
    throw new Error("レビューの取得に失敗しました");
  }
  return res.data;
};

export const createReview = async ([id, data]) => {
  const res = await axios.post(ENDPOINT_URL + `campgrounds/${id}/reviews/`, data);
  if (res.status !== 201) {
    throw new Error("レビューの作成に失敗しました");
  }
};

export const deleteReview = async (reviewId) => {
  const res = await axios.delete(ENDPOINT_URL + `reviews/${reviewId}/`);
  if (res.status !== 204) {
    throw new Error("レビューの削除に失敗しました");
  }
};
