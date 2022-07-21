import React from "react";
import styled from "styled-components";
import GlobalStyles from "../../../global-style";

const Container = styled.div`
  background-color: white;
  overflow-x: hidden;
`;

function GlobalLayout({ children }) {
  return (
    <Container>
      {children}
      <GlobalStyles />
    </Container>
  );
}

export default GlobalLayout;
