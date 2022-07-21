import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`
  border: 1px solid #ebebeb;
  padding: 5px 10px;
  background: #f6f8fa;
`;
const AlertText = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.color};
`;

const LinkAlert = styled(Link)`
  font-weight: 600;
  color: #000;
`;

function FormAlert({ alert, color, isRegister }) {
  return (
    <Box>
      <AlertText color={color}>
        {alert} {isRegister && <LinkAlert to="/login">Login Now</LinkAlert>}
      </AlertText>
    </Box>
  );
}

export default FormAlert;
