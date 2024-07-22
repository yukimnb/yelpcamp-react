import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const getCampgroundsList = async () => {
  const res = await axios.get(API_ENDPOINT + "campgrounds/");
  if (res.status !== 200) {
    throw new Error("キャンプ場一覧の取得に失敗しました");
  }
  return res.data;
};

export const getCampgroundDetail = async (id) => {
  const res = await axios.get(API_ENDPOINT + `campgrounds/${id}/`);
  if (res.status !== 200) {
    throw new Error("キャンプ場の詳細情報の取得に失敗しました");
  }
  return res.data;
};

export const createCampground = async (data) => {
  const res = await axios.post(API_ENDPOINT + "campgrounds/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status !== 201) {
    throw new Error("キャンプ場の作成に失敗しました");
  }
};

export const updateCampground = async ([id, data]) => {
  const res = await axios.patch(API_ENDPOINT + `campgrounds/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status !== 200) {
    throw new Error("キャンプ場の更新に失敗しました");
  }
};

export const deleteCampground = async (id) => {
  const res = await axios.delete(API_ENDPOINT + `campgrounds/${id}/`);
  if (res.status !== 204) {
    throw new Error("キャンプ場の削除に失敗しました");
  }
};
