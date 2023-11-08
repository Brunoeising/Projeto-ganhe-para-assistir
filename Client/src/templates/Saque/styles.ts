import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  height: 100%;
`;

export const Title = styled.h1`
  color: white;
  font-size: 1.8em;
`;

export const Description = styled.p`
  color: #828282;
  text-align: center;
  font-size: 0.8em;
`;

export const ModalSaque = styled.div`
  width: 90%;
  max-width: 450px;
  background-color: #080808;
  border-radius: 20px;
  padding: 35px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SaqueArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3em;
  gap: 30px;
`;

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    color: #462396;
    font-weight: bold;
    cursor: pointer;
  }
`;
