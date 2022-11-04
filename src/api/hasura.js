import axios from "axios";

export default axios.create({
  baseURL: "https://manggaleh-shop.hasura.app/api/rest/",
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret":
      "bqQTJbdQJ5schYcWNg007QkfYqTTgtzy8SM9xAc2xRe6fZ5eWiXOZQ8gWF6N6STr",
  },
});
