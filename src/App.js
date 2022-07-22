import { ATMCard } from "atm-card-react";
import { useState } from "react";
import { publicRoutes } from "./routers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalLayout from "./components/Layout/GlobalLayout";
import DefaultLayout from "./components/Layout/DefaultLayout";
import { withTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [data, setData] = useState({
    number: "",
    month: 2,
    year: 22,
    holder: "",
    cvv: "",
    system: "",
    bankLogo: "",
  });
  return (
    <div>
      <GlobalLayout>
        <BrowserRouter>
          <Routes>
            {publicRoutes?.map((route, index) => {
              let Component = route.component;

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
