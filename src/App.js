import { publicRoutes } from "./routers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalLayout from "./components/Layout/GlobalLayout";
import DefaultLayout from "./components/Layout/DefaultLayout";
import { withTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { selectUserAuth } from "./store/authSlice";
import { LANGUAGE } from "./common/constant";

function App() {
  const userAuth = useSelector(selectUserAuth);
  return (
    <div>
      <GlobalLayout>
        <BrowserRouter>
          <Routes>
            {publicRoutes?.map((route, index) => {
              let Component = route.component;
              if (route.login) {
                if (userAuth === null) {
                  Component = Login;
                } else {
                  Component = route.component;
                }
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  index
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

export default withTranslation(LANGUAGE.TRANSLATE_COMMON)(App);
