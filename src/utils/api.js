import axios from "axios";

const ENDPOINT_URL = "http://localhost:8000/api/v1/";

// const sleep = (delay) => {
//   return new Promise((resolve) => setTimeout(resolve, delay));
// };

export const getCampgroundsList = async () => {
  // await sleep(2000);
  const res = await axios.get(ENDPOINT_URL + "campgrounds/", {
    headers: {
      Authorization: "Token b58b79f5a686b107f6b11adec007f1d5567d05a4",
    },
  });
  return res.data;
};
