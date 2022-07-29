import React from "react";
import styled from "styled-components";

const ErrorText = styled.p`
  color: red;
  margin: 3px 0;
  font-size: 12px;
`;

function FormError({ error }) {
  return <ErrorText>{error}</ErrorText>;
}

export default FormError;
