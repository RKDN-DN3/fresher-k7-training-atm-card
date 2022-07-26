import { checkStatusResponse } from "../utils/checkStatusResponse";
import { loginFailed, loginStarted, loginSuccess } from "./authSlice";
import { getAllATMCard, loginUser } from "../services";
import Cookies from "js-cookie";
import { getATMFailed, getATMStarted, getATMSuccess } from "./atmSlice";

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

const getATMAction = async (token, userId, dispatch) => {
  dispatch(getATMStarted());
  try {
    const res = await getAllATMCard(token, userId);

    if (checkStatusResponse(res)) {
      dispatch(getATMSuccess(res.data));
    }
  } catch (error) {
    dispatch(getATMFailed());
  }
};

export { loginAction, getATMAction };
