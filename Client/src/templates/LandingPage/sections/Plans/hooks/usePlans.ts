import { useEffect, useState } from "react";
import { useWeb3 } from "../../../../../context/Web3Context";
import useEthers from "../../../../../services/ethers";
import { useModal } from "../../../context/ModalContext";
import {
  checkIfUserAlreadyRegistred,
  getUserAndNFTInfoByWallet,
} from "../../../../../functions";

type Balance = {
  WVW: string;
  BNB: string;
};

const usePlans = () => {
  const { setIsOpen } = useModal();
  const { connected, currentWallet, currentChainId, connect } = useWeb3();
  const [plansPrices, setPlansPrices] = useState();
  const {
    getNftPlansPrice,
    provider,
    signer,
    getAllowance,
    aprove,
    buyNft,
    metamask,
    getBalance,
    buyTokens,
  } = useEthers();
  const [allowense, setAllowense] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [balance, setBalance] = useState<Balance>({
    WVW: "0",
    BNB: "0",
  });
  const chainId = 97;

  console.log("currentChainId " + currentChainId);

  const isOnRightChain = currentChainId === chainId;

  const handleGetAllowense = async () => {
    const allowense = await getAllowance();
    setAllowense(allowense);
  };

  const handleGetBalance = async () => {
    const balance = await getBalance(currentWallet);
    setBalance(balance!);
  };

  const handleBuyTokens = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Comprando WVW's...");
      const res = await buyTokens();
      await handleGetBalance();
      console.log(res);
    } catch (error: any) {
      console.log(error);

      if (error.message.includes("insufficient funds for gas")) {
        setError("Você não tem BNB suficiente para comprar 20000 WVW's");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getPlansPrices = async () => {
      if (!provider && !signer && !currentWallet) return;
      const plansPrices = await getNftPlansPrice();

      await handleGetAllowense();
      await handleGetBalance();
      setPlansPrices(plansPrices);
    };

    metamask?.on("chainChanged", async () => {
      await getPlansPrices();
    });

    getPlansPrices();
  }, [provider, signer, currentWallet]);

  const handleBuyNft = async (level: number) => {
    try {
      setLoading(true);
      setError(undefined);
      setLoadingMessage("Comprando NFT...");

      const res = await buyNft(level);
      if (!res) throw new Error("Erro ao comprar NFT");

      const user = await checkIfUserAlreadyRegistred(currentWallet);
      if (user) {
        return connect();
      }
      if (!user) {
        return setIsOpen(true);
      }
    } catch (error: any) {
      if (error.message.includes("transfer amount exceeds balance")) {
        setError("Você não tem WVW suficiente para comprar a NFT");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAprove = async (value: number) => {
    try {
      setLoading(true);
      setLoadingMessage("Aprovando allowance WVW's...");
      const res = await aprove(value);
      await handleGetAllowense();
      await handleGetBalance();
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    plansPrices,
    handleBuyNft,
    handleAprove,
    allowense,
    error,
    loading,
    loadingMessage,
    isOnRightChain,
    connected,
    currentWallet,
    balance,
    handleBuyTokens,
  };
};

export default usePlans;
