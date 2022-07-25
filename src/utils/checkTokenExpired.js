import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const checkTokenExpired = () => {
  const getTokenUser = Cookies.get("user") ? Cookies.get("user") : null;
  if (getTokenUser) {
    if (
      jwtDecode(JSON.parse(getTokenUser).accessToken).exp <
      Date.now() / 1000
    ) {
      Cookies.remove("user");
      
    }
  }
};
