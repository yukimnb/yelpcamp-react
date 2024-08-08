import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const userSignUp = async (data) => {
  const res = await axios.post(API_ENDPOINT + "accounts/signup/", data);
  if (res.status !== 204) {
    throw new Error("ユーザー登録に失敗しました");
  }
};

export const userLogin = async (data) => {
  const res = await axios.post(API_ENDPOINT + "accounts/login/", data);
  if (res.status !== 200) {
    throw new Error("ログインに失敗しました");
  }
  return res.data;
};

export const userLogout = async () => {
  const res = await axios.post(API_ENDPOINT + "accounts/logout/");
  if (res.status !== 200) {
    throw new Error("ログアウトに失敗しました");
  }
};
