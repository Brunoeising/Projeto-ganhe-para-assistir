import YouTube from "react-youtube";
import Header from "../../components/Header";
import VideoItem from "../../components/VideoItem";
import VideoDetails from "./components/VideoDetails";
import * as S from "./styles";
import ButtonMaterialUI from "../../components/ButtonMaterialUI";
import { Alert, LinearProgress } from "@mui/material";
import useWatch from "./hooks/useWatch";

const Watch = () => {
  const {
    handleVideoStart,
    handlePause,
    video,
    feedback,
    handleEnd,
    percentage,
    watched,
    isLoading,
    hasWatchedTheLimitDay,
    handleGetReward,
    relatedVideos,
    id,
    opts,
  } = useWatch();

  return (
    <S.Container>
      <Header />
      <S.MainContainer>
        <S.VideoContainer>
          <S.Video>
            <YouTube
              videoId={id as string}
              opts={opts}
              onPlay={(e) => handleVideoStart(e)}
              onPause={handlePause}
              onEnd={handleEnd}
              style={{ width: "100%" }}
            />
          </S.Video>
          <VideoDetails videoDetails={video!} />
          <S.RewardArea>
            {video?.isParceiro &&
              !watched &&
              !isLoading &&
              !feedback &&
              !hasWatchedTheLimitDay && (
                <Alert severity={video?.videoAssistido ? "error" : "info"}>
                  {video?.videoAssistido
                    ? "Você já assistiu esse vídeo"
                    : "Assista 90% do vídeo para receber WVW's"}
                </Alert>
              )}
            {!video?.isParceiro && !isLoading && (
              <Alert severity="error">
                Este canal não é parceiro do WVW, portanto não é possível
                receber WVW's assistindo seus vídeos
              </Alert>
            )}
            {feedback && (
              <Alert severity={feedback.type}>{feedback.message}</Alert>
            )}
            {hasWatchedTheLimitDay && (
              <Alert severity="error">
                Você já assistiu o limite de vídeos hoje
              </Alert>
            )}
            {watched && (
              <ButtonMaterialUI onClick={handleGetReward}>
                RECEBER WVW'S
              </ButtonMaterialUI>
            )}
          </S.RewardArea>
          <LinearProgress
            variant="determinate"
            sx={{
              width: "60%",
              backgroundColor: "#06030b",
              height: "10px",
              borderRadius: "3px",
              marginTop: "10px",
            }}
            color="secondary"
            value={percentage}
          />
          <S.Description>
            <h2>Descrição</h2>
            <pre>{video?.snippet.description}</pre>
          </S.Description>
        </S.VideoContainer>
        <S.SuggestionsVideos>
          {!video?.isParceiro && !isLoading && (
            <Alert severity="info">
              Esse canal não é parceiro do WVW, portanto não é possível receber
              WVW's assistindo seus vídeos, assista nossos parcerios:
            </Alert>
          )}
          {relatedVideos?.map((video) => (
            <VideoItem key={video.id.videoId} video={video} isRow />
          ))}
        </S.SuggestionsVideos>
      </S.MainContainer>
    </S.Container>
  );
};

export default Watch;
