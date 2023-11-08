import { useQuery } from "react-query";
import { Video } from "../../../../@types";
import { VideosServices } from "../../../services/http/VideosServices/VideosServices";

type VideoDetails = {
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
};

const useYoutubeRelatedVideos = (channel: VideoDetails) => {
  const channelIdForRequest = channel?.isParceiro
    ? channel?.snippet.channelId
    : "UCfWF3b_Zc48XpdgYNJxLy_A";

  const response = useQuery<Video[]>(
    ["youtubeVideoChannel", channelIdForRequest],
    () => VideosServices.getVideosFromChannel(channelIdForRequest)
  );
  return response;
};

export default useYoutubeRelatedVideos;
