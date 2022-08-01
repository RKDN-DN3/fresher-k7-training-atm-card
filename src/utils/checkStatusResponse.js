import {STATUS_200, STATUS_300} from "../common/constant/index";

export const checkStatusResponse = (response) => {
  if (response) {
    if (response.status >= STATUS_200 && response.status < STATUS_300) {
      return response;
    }
  }
};
