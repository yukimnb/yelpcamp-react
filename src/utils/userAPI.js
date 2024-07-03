import axios from "axios";

const ENDPOINT_URL = "http://localhost:8000/api/v1/";

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
