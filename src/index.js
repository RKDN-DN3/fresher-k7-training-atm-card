import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_en from "./translations/en.json";
import common_vn from "./translations/vn.json";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { LANGUAGE } from "./common/constant";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: `${LANGUAGE.ENGLISH}`, // language to use
  resources: {
    EN: {
      common: common_en, // 'common' is our custom namespace
    },
    VN: {
      common: common_vn,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
