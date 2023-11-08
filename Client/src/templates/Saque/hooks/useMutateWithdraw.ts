import { useMutation, useQueryClient } from "react-query";
import useUser from "../../../hooks/useUser";
import { WVWServices } from "../../../services/http/WVWServides/WVWServices";
import { useState } from "react";
import { User } from "../../../../@types";
import { useWeb3 } from "../../../context/Web3Context";

type Feedback = {
  message: string;
  type: "success" | "error";
};

const useMutateWithdraw = (user: User) => {
  const queryClient = useQueryClient();
  const { disconnectUser } = useWeb3();
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const mutation = useMutation(WVWServices.solicitarSaque, {
    onMutate: async () => {
      setFeedback(null);
    },
    onSuccess: (res) => {
      if (res?.status !== 200) {
        setFeedback({
          message: res.response.data.error,
          type: "error",
        });
        return;
      }
      queryClient.invalidateQueries(["user", user?.wallet!]);
      setFeedback({
        message: "Saque solicitado com sucesso",
        type: "success",
      });

      setTimeout(() => {
        disconnectUser();
      }, 3000);
    },
    onError: (e: any) => {
      console.log(e);
      setFeedback({
        message: "Erro ao solicitar saque",
        type: "error",
      });
    },
  });

  return {
    mutation,
    feedback,
  };
};

export default useMutateWithdraw;
