import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const getCampgroundsList = async () => {
  try {
    const res = await axios.get(API_ENDPOINT + "campgrounds/");
    return res.data;
  } catch (e) {
    throw new Error("キャンプ場一覧の取得に失敗しました");
  }
};

export const getCampgroundDetail = async (id) => {
  try {
    const res = await axios.get(API_ENDPOINT + `campgrounds/${id}/`);
    return res.data;
  } catch (e) {
    throw new Error("キャンプ場の詳細情報の取得に失敗しました");
  }
};

export const createCampground = async (data) => {
  try {
    await axios.post(API_ENDPOINT + "campgrounds/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    throw new Error("キャンプ場の作成に失敗しました");
  }
};

export const updateCampground = async ([id, data]) => {
  try {
    await axios.patch(API_ENDPOINT + `campgrounds/${id}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    throw new Error("キャンプ場の更新に失敗しました");
  }
};

export const deleteCampground = async (id) => {
  try {
    await axios.delete(API_ENDPOINT + `campgrounds/${id}/`);
  } catch (e) {
    throw new Error("キャンプ場の削除に失敗しました");
  }
};
