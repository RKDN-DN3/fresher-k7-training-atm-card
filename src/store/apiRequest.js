import { checkStatusResponse } from "../utils/checkStatusResponse";
import { getAllATMCard } from "../services";
import { getATMFailed, getATMStarted, getATMSuccess } from "./atmSlice";

const getATMAction = async (userId, dispatch) => {
  dispatch(getATMStarted());
  try {
    const res = await getAllATMCard(userId);

    if (checkStatusResponse(res)) {
      dispatch(getATMSuccess(res.data));
    }
  } catch (error) {
    dispatch(getATMFailed());
  }
};

export { getATMAction };
