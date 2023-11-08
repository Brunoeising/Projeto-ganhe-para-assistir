import styled from "styled-components";

type SectionProps = {
  hasGradient?: boolean;
};

export const Container = styled.div`
  background-color: #030303;
`;

export const Section = styled.section<SectionProps>`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${({ hasGradient }) =>
    hasGradient
      ? "linear-gradient(179.94deg, #221441 0.01%, #000000 57.59%)"
      : "transparent"};
`;

export const H1 = styled.h1`
  color: white;
  font-size: 24px;

  // media query
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const TextColored = styled.h1`
  background-clip: text;
  font-size: 70px;
  line-height: 64px;
  color: white;
  span {
    background: linear-gradient(90.19deg, #0927aa 6.71%, #462396 59.36%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 30px;
    line-height: 30px;
  }
`;

export const Text = styled.p`
  color: #a7a7a7;
  font-size: 0.9em;
  font-weight: 400;
`;

// criar uma esfera com o tamanho de 100px que fique desfocada no fundo da página

type SphereProps = {
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;

  scaleInPx?: number;
  background?: string;
};

export const Sphere = styled.div<SphereProps>`
  position: absolute;
  width: ${({ scaleInPx }) => scaleInPx || 100}px;
  height: ${({ scaleInPx }) => scaleInPx || 100}px;
  border-radius: 50%;
  background: ${({ background }) => background || "#462396"};
  opacity: 0.8;
  filter: blur(80px);
  left: ${({ left }) => left || ""};
  top: ${({ top }) => top || ""};
  right: ${({ right }) => right || ""};
  bottom: ${({ bottom }) => bottom || ""};
`;
