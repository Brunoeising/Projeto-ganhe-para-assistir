import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  height: 100%;
  color: white;

  p {
    color: #828282;
  }

  @media (max-width: 1000px) {
    h1 {
      font-size: 0.8rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

export const AdminArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3em;
  gap: 20px;
`;

export const TablesToAprove = styled.div`
  width: 80%;
`;

export const Title = styled.h1`
  font-size: 1.4rem;
`;

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
