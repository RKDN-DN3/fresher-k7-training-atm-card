import React from "react";
import styled from "styled-components";
import Header from "../../Header";

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`

const Content = styled.div`
  padding: 10px 25px;

  @media only screen and (max-width: 420px)
  {
    padding: 10px;
  }
`

function DefaultLayout({ children }) {
  return (
    <Container>
      <Header/>
      <Content>{children}</Content>
    </Container>
  );
}

export default DefaultLayout;
