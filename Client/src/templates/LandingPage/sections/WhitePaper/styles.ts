import styled from "styled-components";

export const Container = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.8em;
  flex-direction: column;
  max-width: 500px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
