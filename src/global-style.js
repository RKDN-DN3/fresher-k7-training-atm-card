import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,100;1,300;1,500&display=swap');
:root {
  --color-white: #ffffff;
  --color-text: #333;
}

body {
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  font-size: 14px;
}

a {
  text-decoration: none;
}
`;

export default GlobalStyles;
