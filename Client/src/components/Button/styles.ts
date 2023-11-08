import styled from "styled-components";

type ButtonProps = {
  width?: string | number;
  colored?: boolean;
};

export const Button = styled.button<ButtonProps>`
  background: ${(props) =>
    props.colored
      ? "linear-gradient(90.19deg, #0927aa 6.71%, #462396 59.36%)"
      : "white"};
  background-color: ${(props) => (props.colored ? "#0927aa" : "white")};
  border-radius: 10px;
  height: 50px;
  border: none;
  transition: 0.3s;
  color: ${(props) => (props.colored ? "white" : "#0927aa")};
  cursor: pointer;
  min-width: ${(props) => props.width || "200px"};
  width: ${(props) => props.width || ""};
  padding: 0px 10px;

  &:disabled {
    background: ${(props) => (props.colored ? "#0927aa" : "#d3d3d3")};
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover {
    background: ${(props) => (props.colored ? "#0927aa" : "#d3d3d3")};
  }

  @media (max-width: 840px) {
    width: 100%;
  }
`;

export const ButtonText = styled.p<ButtonProps>`
  color: ${(props) => (props.colored ? "white" : "black")};
  font-weight: bold;
`;
