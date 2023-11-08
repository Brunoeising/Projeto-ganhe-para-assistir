import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
`;

export const CardsArea = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;

  @media (max-width: 840px) {
    width: 100%;
    flex-direction: column;
    gap: 20px;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
`;

export const ButtonsArea = styled.div`
  width: 50%;
  max-width: 400px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 840px) {
    width: 100%;
    gap: 5px;
  }
`;

export const CurrentBalance = styled.div`
  color: #d2d2d2;
  background-color: #000;
  padding: 10px;
  border-radius: 10px;
`;
