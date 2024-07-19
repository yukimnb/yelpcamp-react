import axios from "axios";

const ENDPOINT_URL = "http://localhost:8000/api/v1/";

export const getCampgroundsList = async () => {
  const res = await axios.get(ENDPOINT_URL + "campgrounds/");
  if (res.status !== 200) {
    throw new Error("キャンプ場一覧の取得に失敗しました");
  }
  return res.data;
};

export const getCampgroundDetail = async (id) => {
  const res = await axios.get(ENDPOINT_URL + `campgrounds/${id}/`);
  if (res.status !== 200) {
    throw new Error("キャンプ場の詳細情報の取得に失敗しました");
  }
  return res.data;
};

export const createCampground = async (data) => {
  const res = await axios.post(ENDPOINT_URL + "campgrounds/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status !== 201) {
    throw new Error("キャンプ場の作成に失敗しました");
  }
};

export const updateCampground = async ([id, data]) => {
  const res = await axios.patch(ENDPOINT_URL + `campgrounds/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status !== 200) {
    throw new Error("キャンプ場の更新に失敗しました");
  }
};

export const deleteCampground = async (id) => {
  const res = await axios.delete(ENDPOINT_URL + `campgrounds/${id}/`);
  if (res.status !== 204) {
    throw new Error("キャンプ場の削除に失敗しました");
  }
};
