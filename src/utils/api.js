import axios from "axios";

const ENDPOINT_URL = "http://localhost:8000/api/v1/";

export const getCampgroundsList = async () => {
  const res = await axios.get(ENDPOINT_URL + "campgrounds/");
  return res.data;
};

export const getCampgroundDetail = async (id) => {
  const res = await axios.get(ENDPOINT_URL + `campgrounds/${id}/`);
  return res.data;
};

export const userLogin = async (data) => {
  const res = await axios.post(ENDPOINT_URL + "accounts/login/", data);
  return res.data;
};

export const userLogout = async () => {
  const res = await axios.post(ENDPOINT_URL + "accounts/logout/");
  return res.status;
};
