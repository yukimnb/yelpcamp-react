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

export const createCampground = async (data) => {
  const res = await axios.post(ENDPOINT_URL + "campgrounds/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.status;
};

export const userSignUp = async (data) => {
  const res = await axios.post(ENDPOINT_URL + "accounts/signup/", data);
  return res.status;
};

export const userLogin = async (data) => {
  const res = await axios.post(ENDPOINT_URL + "accounts/login/", data);
  return res.data;
};

export const userLogout = async () => {
  const res = await axios.post(ENDPOINT_URL + "accounts/logout/");
  return res.status;
};

export const getForwardGeocoding = async (address) => {
  const res = await axios.get("https://api.mapbox.com/search/geocode/v6/forward", {
    params: {
      q: address,
      access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      limit: 1,
    },
  });
  return res.data.features[0];
};
