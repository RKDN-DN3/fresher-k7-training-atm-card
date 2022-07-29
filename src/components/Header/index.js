import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUserAuth } from "../../store/authSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { CONSTANTS } from "../../common/constant";

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  background: #f6f8fa;
`;
const Box = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  border: 1px solid #ebebeb;
  padding: 5px 10px;
`;
const LogoText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000;
`;
const MenuRight = styled.div`
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media only screen and (max-width: ${CONSTANTS.LARGE_MOBILE}px) {
    min-width: 150px;
  }
`;
const LinkHeader = styled(Link)`
  color: #000;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;
const LogoutButton = styled.div`
  cursor: pointer;
  color: #000;
  &:hover {
    opacity: 0.8;
  }
`;

function Header() {
  const userAuth = useSelector(selectUserAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(CONSTANTS.TRANSLATE_COMMON);

  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/login");
    dispatch(logout());
    toast.success(t("header.alert.logout.success"));
  };

  const handleOnChangeLanguage = (e) => {
    let language = e.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <Container>
      <Box>
        <LogoText>ATMCard</LogoText>
        <select onChange={handleOnChangeLanguage}>
          <option value="en">EN</option>
          <option value="vn">VN</option>
        </select>
        {userAuth ? (
          <MenuRight>
            <span>
              {t("header.hello")}: {userAuth.user.username}
            </span>{" "}
            {"|"}
            <LogoutButton onClick={handleLogout}>
              {t("header.logout")}
            </LogoutButton>
          </MenuRight>
        ) : (
          <MenuRight>
            <LinkHeader to="/register">{t("header.register")}</LinkHeader>
            <LinkHeader to="/login">{t("header.login")}</LinkHeader>
          </MenuRight>
        )}
      </Box>
    </Container>
  );
}

export default Header;
