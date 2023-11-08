import styled from "styled-components";

type ContainerProps = {
  isVisible: boolean;
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 9;
  transition: 0.3s;
  top: ${({ isVisible }) => (isVisible ? "0" : "-70px")};
  background: rgba(28, 28, 28, 0.19);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(5px);
`;

export const Logo = styled.div`
  color: white;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Menu = styled.div``;

export const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 80px;
  width: 400px;
`;

export const Option = styled.div`
  cursor: pointer;
`;
