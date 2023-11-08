import styled from "styled-components";

export const Container = styled.div`
  max-width: 100vw;
`;

export const MainContainer = styled.div`
  height: 100%;

  display: flex;

  @media (max-width: 970px) {
    flex-direction: column;
    max-width: auto;
    height: auto;
  }
`;

export const VideoContainer = styled.div`
  height: 100%;
  width: 65%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2em;

  @media (max-width: 970px) {
    width: 100%;
  }
`;

export const Video = styled.div`
  width: 90%;

  border-radius: 20px;
`;

export const SuggestionsVideos = styled.div`
  width: 35%;
  height: 100%;
  padding-top: 2em;
  display: flex;
  flex-direction: column;

  @media (max-width: 970px) {
    width: 100%;
    height: auto;
    align-items: center;
    padding-left: 2em;
  }
`;

export const VideoDetails = styled.div`
  width: 90%;
  padding: 1.4em 0px;
  display: flex;

  @media (max-width: 970px) {
    align-items: center;
  }
`;

export const VideoInfo = styled.div`
  width: 100%;
`;

export const VideoTitle = styled.div`
  color: white;
  font-size: 0.7em;
  h1 {
    font-weight: 600;
  }

  @media (max-width: 970px) {
    h1 {
      font-size: 1.2em;
    }
  }
`;

export const VideoViews = styled.div`
  color: #a7a7a7;
  font-size: 0.8em;
  h3 {
    font-weight: 200;
  }
`;

export const VideoChannel = styled.div`
  width: 40%;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: end;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const ChannelInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ChannelName = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  gap: 10px;
  h2 {
    font-size: 0.8em;
    font-weight: 600;
  }

  @media (max-width: 700px) {
    gap: 0px;
    justify-content: center;
  }
`;

export const ChannelSubscribers = styled.div`
  color: #a7a7a7;
  h3 {
    font-size: 0.8em;
    font-weight: 200;
  }
`;

export const RewardArea = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const Description = styled.div`
  width: 90%;
  padding: 1.4em 0px;
  display: flex;
  flex-direction: column;
  color: white;
  gap: 10px;

  pre {
    font-size: 0.9em;
    font-weight: 200;
    color: #a7a7a7;
    max-width: max-content;
    white-space: pre-wrap;
  }
`;
