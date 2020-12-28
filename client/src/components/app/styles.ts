import styled from "styled-components";
import vars from "../../styles/vars";

export const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: ${vars.colorDark};
  color: ${vars.colorLight};
`;
