import { createGlobalStyle } from "styled-components";
import vars from "./vars";

export default createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  html {
    font-size: ${vars.rootSize}px;
    font-family: Arial, sans-serif;
  }
`;
