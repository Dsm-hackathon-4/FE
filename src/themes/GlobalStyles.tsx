import { Global, css } from "@emotion/react";
import { theme } from "./theme";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.font.b2.fontFamily};
    font-weight: ${theme.font.b2.fontWeight};
    font-size: ${theme.font.b2.fontSize};
    line-height: ${theme.font.b2.lineHeight};
    color: ${theme.color.black};
    background-color: ${theme.color.white};
  }

  #root {
    width: 100%;
    height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }
`;

const GlobalStyles = () => {
  return <Global styles={globalStyles} />;
};

export default GlobalStyles;
