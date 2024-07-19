import axios from "axios";

export const getForwardGeocoding = async (address) => {
  const res = await axios.get("https://api.mapbox.com/search/geocode/v6/forward", {
    params: {
      q: address,
      access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      limit: 1,
    },
  });
  if (res.status !== 200) {
    throw new Error("位置情報の取得に失敗しました");
  }
  return res.data.features[0];
};
