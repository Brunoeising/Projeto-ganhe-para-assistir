import styled from "styled-components";

type InputProps = {
  width?: string;
  height?: string;
  padding?: string;
};

export const Input = styled.input<InputProps>`
  color: white;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "50px"};
  padding-left: 10px;
  background-color: #080808;
  outline: none;
  border-radius: 4px;
  border: 1px solid #462396;
`;
