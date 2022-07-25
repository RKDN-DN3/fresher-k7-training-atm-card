import { publicRoutes } from "./routers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalLayout from "./components/Layout/GlobalLayout";
import DefaultLayout from "./components/Layout/DefaultLayout";
import { withTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <GlobalLayout>
        <BrowserRouter>
          <Routes>
            {publicRoutes?.map((route, index) => {
              let Component = route.component;
              if (route.login) {
                if (Cookies.get("user") == null) {
                  Component = Login;
                } else {
                  Component = route.component;
                }
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <DefaultLayout>
                      <Component />
                    </DefaultLayout>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </GlobalLayout>
    </div>
  );
}

export default withTranslation("common")(App);
