import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const getReview = async (id) => {
  try {
    const res = await axios.get(API_ENDPOINT + `campgrounds/${id}/reviews/`);
    return res.data;
  } catch (e) {
    throw new Error("レビューの取得に失敗しました");
  }
};

export const createReview = async ([id, data]) => {
  try {
    await axios.post(API_ENDPOINT + `campgrounds/${id}/reviews/`, data);
  } catch (e) {
    throw new Error("レビューの作成に失敗しました");
  }
};

export const deleteReview = async (reviewId) => {
  try {
    await axios.delete(API_ENDPOINT + `reviews/${reviewId}/`);
  } catch (e) {
    throw new Error("レビューの削除に失敗しました");
  }
};
