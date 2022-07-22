import {CONSTANTS} from "../common/constant/index";

export const checkStatusResponse = (response) => {
  if (response) {
    if (response.status >= CONSTANTS.STATUS_200 && response.status < CONSTANTS.STATUS_300) {
      return response;
    }
  }
};
