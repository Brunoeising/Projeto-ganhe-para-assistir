import styled from "styled-components";

type CardProps = {
  isEmphasis: boolean;
};

export const Card = styled.div<CardProps>`
  padding: 15px;
  background: linear-gradient(
    180deg,
    #101010 6.74%,
    rgba(20, 12, 39, 0) 106.74%
  );
  width: 30%;
  min-width: 240px;
  max-width: 330px;
  height: 350px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  padding-top: 2em;
  flex-direction: column;
  color: white;
  text-align: center;
  transition: 0.3s;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  ${({ isEmphasis }) =>
    isEmphasis &&
    "border-width: 4px; border-style: solid; border-image: linear-gradient(to bottom, darkblue 20%, #520283,#030303) 1;"}
  .body {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    flex-direction: column;
    height: 46px;
    margin-bottom: 20px;
  }

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 840px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const CardTitle = styled.h1`
  font-weight: 500;
  font-size: 1.1em;
`;

export const Price = styled.h1`
  font-size: 36px;
  line-height: 1.2em;
`;

export const CardDescription = styled.p`
  color: #a7a7a7;
  font-size: 0.8em;
`;

export const Currency = styled.span`
  font-size: 0.53em;
  color: #a7a7a7;
`;

export const Label = styled.span`
  font-weight: bold;
  position: relative;
  top: -20px;
  background: linear-gradient(to right, darkblue, darkorchid);
  height: 2px;
`;
