import { useQuery } from "react-query";
import { VideosServices } from "../../../services/http/VideosServices/VideosServices";

export type VideoDetails = {
  snippet: {
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
  };
  statistics: {
    viewCount: string;
  };
  isParceiro: boolean;
  videoAssistido: boolean;
};

const useYoutubeVideo = (videoId: string) => {
  const response = useQuery<VideoDetails>(
    ["youtubeVideo", videoId],
    () => VideosServices.getVideo(videoId),
    {
      cacheTime: 0,
    }
  );
  return response;
};

export default useYoutubeVideo;
