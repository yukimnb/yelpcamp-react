import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const userSignUp = async (data) => {
  try {
    await axios.post(API_ENDPOINT + "accounts/signup/", data);
  } catch (e) {
    throw new Error("ユーザー登録に失敗しました");
  }
};

export const userLogin = async (data) => {
  try {
    const res = await axios.post(API_ENDPOINT + "accounts/login/", data);
    return res.data;
  } catch (e) {
    throw new Error("ログインに失敗しました");
  }
};

export const userLogout = async () => {
  try {
    await axios.post(API_ENDPOINT + "accounts/logout/");
  } catch (e) {
    throw new Error("ログアウトに失敗しました");
  }
};
