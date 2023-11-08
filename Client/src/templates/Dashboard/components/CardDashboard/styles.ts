import styled from "styled-components";

type ContainerProps = {
  isGradient?: boolean;
};

export const Container = styled.div<ContainerProps>`
  height: 170px;
  width: 47%;
  background: ${({ isGradient }) =>
    isGradient
      ? "linear-gradient(105.45deg, #462396 33.14%, #460096 107.09%);"
      : "#060606"};
  border-radius: 20px;
  padding: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  h2 {
    font-size: 0.95em;
  }

  @media (max-width: 1000px) {
    height: 135px;

    h2 {
      font-size: 0.8em;
    }

    h1 {
      font-size: 1.2em;
    }
  }

  @media (max-width: 420px) {
    width: 100%;
  }
`;
