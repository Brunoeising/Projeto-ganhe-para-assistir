import styled from "styled-components";

type ContainerProps = {
  isRow?: boolean;
  size?: "small" | "large";
};

export const Container = styled.div`
  color: white;
  width: ${({ isRow }: ContainerProps) => (!isRow ? "280px" : "100%")};
  display: flex;
  flex-direction: ${({ isRow }: ContainerProps) => (isRow ? "row" : "column")};
  align-items: center;
  padding: 5px;
  gap: 10px;
  h2,
  h3 {
    color: #a7a7a7;
    font-weight: 400;
  }

  @media (max-width: 970px) {
    width: ${({ isRow }: ContainerProps) => (!isRow ? "250px" : "100%")};
  }
`;

export const Thumbnail = styled.div`
  height: ${({ size }: ContainerProps) =>
    size === "large" ? "150px" : "110px"};
  width: ${({ size }: ContainerProps) =>
    size === "large" ? "270px" : "190px"};
  cursor: pointer;
  transition: 0.2s;
  z-index: 1000000;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  &:hover {
    border: 2px solid #fff;
    transform: scale(1.02);
  }

  @media (max-width: 978px) {
    height: ${({ size }: ContainerProps) =>
      size === "large" ? "140px" : "110px"};
    width: ${({ size }: ContainerProps) =>
      size === "large" ? "250px" : "190px"};
  }
`;

export const Title = styled.div`
  height: 20px;
  width: 100%;
`;

export const VideoDetails = styled.div`
  display: flex;
  justify-content: ${({ isRow }: ContainerProps) => (!isRow ? "center" : "")};
  align-items: ${({ isRow }: ContainerProps) => (!isRow ? "center" : "")};
  padding: ${({ isRow }: ContainerProps) => (!isRow ? "0px" : "1.4em 0px")};
  width: ${({ isRow }: ContainerProps) => (!isRow ? "100%" : "50%")};

  h1 {
    font-size: ${({ isRow }: ContainerProps) => (isRow ? "13px" : "15px")};
  }

  @media (max-width: 800px) {
    h1 {
      font-size: ${({ isRow }: ContainerProps) => (isRow ? "11px" : "13px")};
    }
  }
`;

export const UserPhoto = styled.div`
  height: 100%;
  width: 23%;
  display: flex;
`;

export const VideoInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
`;

export const VideoTitle = styled.div`
  width: 100%;
`;

export const VideoChannel = styled.div`
  h2 {
    font-size: 12px;
  }
`;

export const VideoViews = styled.div`
  h3 {
    font-size: 12px;
  }
`;
