import axios from "axios";

const ENDPOINT_URL = "http://localhost:8000/api/v1/";

export const getCampgroundsList = async () => {
  const res = await axios.get(ENDPOINT_URL + "campgrounds/", {
    headers: {
      Authorization: "Token b58b79f5a686b107f6b11adec007f1d5567d05a4",
    },
  });
  return res.data;
};

export const getCampgroundDetail = async (id) => {
  const res = await axios.get(ENDPOINT_URL + `campgrounds/${id}/`, {
    headers: {
      Authorization: "Token b58b79f5a686b107f6b11adec007f1d5567d05a4",
    },
  });
  return res.data;
};
