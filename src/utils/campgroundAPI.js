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

export const updateCampground = async ([id, data]) => {
  const res = await axios.patch(ENDPOINT_URL + `campgrounds/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.status;
};

export const deleteCampground = async (id) => {
  const res = await axios.delete(ENDPOINT_URL + `campgrounds/${id}/`);
  return res.status;
};
