import { checkStatusResponse } from "../utils/checkStatusResponse";
import { loginFailed, loginStarted, loginSuccess } from "./authSlice";
import { loginUser } from "../services";
import Cookies from "js-cookie";

const loginAction = async (user, dispatch, navigate) => {
  dispatch(loginStarted());
  try {
    const res = await loginUser(user);
    if (checkStatusResponse(res)) {
      dispatch(loginSuccess(res.data));
      navigate("/");
      Cookies.set("user", JSON.stringify(res.data));
    }
  } catch (error) {
    dispatch(loginFailed(error.response.data));
  }
};

export { loginAction };
