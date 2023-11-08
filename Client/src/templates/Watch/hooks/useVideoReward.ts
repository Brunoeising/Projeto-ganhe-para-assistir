import { useQueryClient } from "react-query";
import { VideosServices } from "../../../services/http/VideosServices/VideosServices";

type useVideoRewardProps = {
  id: string;
  currentWallet: string;
  setFeedback: (feedback: any) => void;
  setWatched: (watched: boolean) => void;
};

const useVideoReward = ({
  id,
  currentWallet,
  setFeedback,
  setWatched,
}: useVideoRewardProps) => {
  const queryClient = useQueryClient();

  const handleGetReward = async () => {
    try {
      const veriryId = `${id}${currentWallet}`;
      const response = await VideosServices.getReward(veriryId);
      setFeedback({
        message: "WVW's recebidos com sucesso",
        type: "success",
      });
    } catch (error: any) {
      setFeedback({
        message: error.message,
        type: "error",
      });
    } finally {
      queryClient.invalidateQueries(["user", currentWallet]);
      setWatched(false);
    }
  };

  return { handleGetReward };
};

export default useVideoReward;
