import styled from "styled-components";

type ContainerProps = {
  isOpen: boolean;
};

type MessageProps = {
  error: boolean;
};

export const Container = styled.div<ContainerProps>`
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: rgba(7, 7, 7, 0.4);
  backdrop-filter: blur(3px);
  z-index: 20;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  width: 50%;
  height: 200px;
  background-color: #140c27;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  width: 70%;
  display: flex;
  h1 {
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

export const FormArea = styled.form`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const Message = styled.p`
  color: ${({ error }: MessageProps) => (error ? "#ff0000" : "#fff")};
  font-size: 0.8rem;
`;
