import { css } from "@mui/material/styles";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 500px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 720px) {
      ${props}
    }
  `;
};
