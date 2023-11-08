import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.div`
  max-width: 850px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  flex-direction: column;

  .texts {
    display: flex;
    flex-direction: column;
    gap: 0.9em;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
  }

  .buttons-presentation {
    display: flex;
    gap: 1em;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.5em;
    }
  }

  .community {
    position: absolute;
    bottom: 50px;
    cursor: pointer;
    margin-top: 2em;
    display: flex;
    align-items: center;
    color: white;
    gap: 0.5em;
    justify-content: center;

    // on hover, the underline will be 100% of the width
    &:hover::after {
      width: 70%;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 1;
      transition: 0.7s;
      right: 0;
      width: 30%;
      height: 2px;
      background: white;
    }

    p {
      font-size: 0.85em;
      font-weight: 600;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;
