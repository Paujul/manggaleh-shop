import axios from "axios";

export default axios.create({
  baseURL: "https://manggaleh-shop.hasura.app/api/rest/",
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": process.env.REACT_APP_API_KEY,
  },
});
