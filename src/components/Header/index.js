import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUserAuth } from "../../store/authSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  max-width: 1200px;
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
  const { t } = useTranslation("common");

  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/login");
    dispatch(logout());
    toast.success(t("header.alert.logout.success"));
  };
  return (
    <Container>
      <Box>
        <LogoText>ATMCard</LogoText>
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
