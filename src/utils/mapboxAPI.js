import axios from "axios";

export const getForwardGeocoding = async (address) => {
  const res = await axios.get("https://api.mapbox.com/search/geocode/v6/forward", {
    params: {
      q: address,
      access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      limit: 1,
    },
  });
  return res.data.features[0];
};
