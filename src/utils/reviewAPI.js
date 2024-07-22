import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const getReview = async (id) => {
  const res = await axios.get(API_ENDPOINT + `campgrounds/${id}/reviews/`);
  if (res.status !== 200) {
    throw new Error("レビューの取得に失敗しました");
  }
  return res.data;
};

export const createReview = async ([id, data]) => {
  const res = await axios.post(API_ENDPOINT + `campgrounds/${id}/reviews/`, data);
  if (res.status !== 201) {
    throw new Error("レビューの作成に失敗しました");
  }
};

export const deleteReview = async (reviewId) => {
  const res = await axios.delete(API_ENDPOINT + `reviews/${reviewId}/`);
  if (res.status !== 204) {
    throw new Error("レビューの削除に失敗しました");
  }
};
