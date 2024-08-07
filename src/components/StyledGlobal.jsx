import { Global, css } from "@emotion/react";

const global = css`
  a {
    text-decoration: none;
  }
`;

export const StyledGlobal = () => <Global styles={global} />;
