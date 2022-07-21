import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LinkHeader = styled(Link)`
  color: #000;
  text-decoration: none;

  &:hover{
    opacity: 0.8;
  }
`

function Header() {
  return (
    <Container>
      <Box>
        <LogoText>ATMCard</LogoText>
        <MenuRight>
          <LinkHeader to="/register">Register</LinkHeader>
          <LinkHeader to="/login">Login</LinkHeader>
        </MenuRight>
      </Box>
    </Container>
  );
}

export default Header;
