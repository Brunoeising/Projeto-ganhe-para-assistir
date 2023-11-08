import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ImageMockup = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const TextArea = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
