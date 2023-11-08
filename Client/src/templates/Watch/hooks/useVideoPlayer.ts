import { YouTubeEvent } from "react-youtube";
import useUser from "../../../hooks/useUser";
import { VideosServices } from "../../../services/http/VideosServices/VideosServices";
import { VideoDetails } from "./useYoutubeVideo";
import { useRef, useState, useEffect } from "react";
import { useWeb3 } from "../../../context/Web3Context";

type useVideoPlayerProps = {
  video: VideoDetails;
  id: string;
  setFeedback: (feedback: any) => void;
  setWatched: (watched: boolean) => void;
};

const useVideoPlayer = ({
  video,
  id,
  setFeedback,
  setWatched,
}: useVideoPlayerProps) => {
  const user = useUser();
  const { currentWallet } = useWeb3();
  const hasWatchedTheLimitDay =
    user?.data?.videosWatchedToday! >= user?.NFT?.limite_dia!;
  const [percentage, setPercentage] = useState(0);

  const counter = useRef(0);
  const interval = useRef<any>();

  useEffect(() => {
    clearInterval(interval.current);
    counter.current = 0;
    setPercentage(0);
    setFeedback(null);
    setWatched(false);
    VideosServices.stopVideoOnServer(`${id}${currentWallet}`);

    return () => {
      counter.current = 0;
      clearInterval(interval.current);
      VideosServices.stopVideoOnServer(`${id}${currentWallet}`);
      setWatched(false);
      setFeedback(null);
      setPercentage(0);
    };
  }, [id, currentWallet]);

  const handleVideoStart = async (e: YouTubeEvent) => {
    if (video?.videoAssistido || hasWatchedTheLimitDay) return;
    if (counter.current === 0) {
      try {
        const { video } = await VideosServices.startVideoOnServer({
          videoId: id as string,
          wallet: currentWallet,
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (!video?.isParceiro) {
      return;
    }

    const videoDurationTime = await e.target.getDuration().toFixed(0);
    const duration90 = (videoDurationTime * 0.9).toFixed(0);

    if (interval) {
      clearInterval(interval.current);
    }

    interval.current = setInterval(() => {
      counter.current++;
      const percentage = (counter.current / Number(duration90)) * 100;
      setPercentage(percentage);

      if (counter.current >= Number(duration90)) {
        setWatched(true);

        clearInterval(interval.current);
        counter.current = 0;
      }
    }, 1000);
  };

  const handlePause = () => {
    console.log("VIDEO PAUSED");
    clearInterval(interval.current);
  };

  const handleEnd = () => {
    console.log("video ended");
    clearInterval(interval.current);
    counter.current = 0;
  };

  return {
    handleVideoStart,
    handlePause,
    handleEnd,
    percentage,
  };
};

export default useVideoPlayer;
