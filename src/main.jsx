import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import NewsSearch from "./pages/NewsSearch";
import './index.css'


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NewsSearch />
  </Provider>
);
