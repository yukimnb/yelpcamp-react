import axios from "axios";

const ENDPOINT_URL = "http://localhost:8000/api/v1/";

export const userSignUp = async (data) => {
  const res = await axios.post(ENDPOINT_URL + "accounts/signup/", data);
  if (res.status !== 204) {
    throw new Error("ユーザー登録に失敗しました");
  }
};

export const userLogin = async (data) => {
  const res = await axios.post(ENDPOINT_URL + "accounts/login/", data);
  if (res.status !== 200) {
    throw new Error("ログインに失敗しました");
  }
  return res.data;
};

export const userLogout = async () => {
  const res = await axios.post(ENDPOINT_URL + "accounts/logout/");
  if (res.status !== 200) {
    throw new Error("ログアウトに失敗しました");
  }
};
