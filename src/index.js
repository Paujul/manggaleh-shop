import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";

import { ApolloProvider } from "@apollo/client";
import apollo from "./apollo/apollo";

import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={apollo}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
