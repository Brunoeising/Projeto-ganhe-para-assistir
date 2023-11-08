import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import { YouTubeEvent } from "react-youtube";
import { useWeb3 } from "../../../context/Web3Context";
import useUser from "../../../hooks/useUser";
import { VideosServices } from "../../../services/http/VideosServices/VideosServices";
import useVideoPlayer from "./useVideoPlayer";
import useVideoReward from "./useVideoReward";
import useYoutubeRelatedVideos from "./useYoutubeRelatedVideos";
import useYoutubeVideo from "./useYoutubeVideo";

type Feedback = {
  message: string;
  type: "success" | "error";
};

const useWatch = () => {
  const { query } = useRouter();
  const { id } = query;
  const { data: video, isLoading } = useYoutubeVideo(id as string);
  const { data: relatedVideos } = useYoutubeRelatedVideos(video!);
  const { currentWallet } = useWeb3();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const user = useUser();
  const [watched, setWatched] = useState(false);
  const hasWatchedTheLimitDay =
    user?.data?.videosWatchedToday! >= user?.NFT?.limite_dia!;

  const { handleEnd, handlePause, handleVideoStart, percentage } =
    useVideoPlayer({
      video: video!,
      id: id as string,
      setFeedback,
      setWatched,
    });

  const { handleGetReward } = useVideoReward({
    id: id as string,
    currentWallet,
    setFeedback,
    setWatched,
  });

  const opts = {
    width: "100%",
    heigth: "100%",
  };

  return {
    video,
    isLoading,
    opts,
    handleVideoStart,
    handlePause,
    handleEnd,
    handleGetReward,
    watched,
    relatedVideos,
    feedback,
    percentage,
    hasWatchedTheLimitDay,
    currentWallet,
    id,
  };
};

export default useWatch;
