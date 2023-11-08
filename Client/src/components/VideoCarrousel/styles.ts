import styled from "styled-components";

export const Video = styled.div`
  width: 100%;
  height: 90vh;

  @media (max-width: 700px) {
    height: 40vh;
  }
`;

export const VideoThumbnail = styled.div`
  height: 100%;
  width: calc(100vw - 100px);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 50px);
  }
`;

export const GradientHorizontalFromBottom = styled.div`
  width: 100%;
  height: 60%;
  background: linear-gradient(
    360deg,
    #030303 17.88%,
    rgba(14, 8, 28, 0) 81.77%
  );
  position: absolute;
  bottom: -50px;
  left: 0;
  z-index: 1;
`;
