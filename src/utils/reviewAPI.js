import axios from "axios";

const ENDPOINT_URL = "http://localhost:8000/api/v1/";

export const getReview = async (id) => {
  const res = await axios.get(ENDPOINT_URL + `campgrounds/${id}/reviews/`);
  return res.data;
};

export const createReview = async ([id, data]) => {
  const res = await axios.post(ENDPOINT_URL + `campgrounds/${id}/reviews/`, data);
  return res.status;
};

export const deleteReview = async (reviewId) => {
  const res = await axios.delete(ENDPOINT_URL + `reviews/${reviewId}/`);
  return res.status;
};
