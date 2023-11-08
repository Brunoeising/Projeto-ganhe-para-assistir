import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import useEthers from "../services/ethers";
import { UserServices } from "../services/http/UserServices/UserServices";

type Balance = {
  WVW: string;
  BNB: string;
};

const useUser = () => {
  const { currentWallet, NFT } = useWeb3();
  const [balance, setBalance] = useState<Balance | undefined>(undefined);
  const { getBalance } = useEthers();

  const { data, isLoading, isFetching } = useQuery(
    ["user", currentWallet],
    () => UserServices.getUserInfo(currentWallet),
    {
      refetchInterval: 10000,
      staleTime: 10000,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await getBalance(currentWallet);
      setBalance(balance);
    };
    fetchBalance();
  }, [data, currentWallet, isFetching]);

  return { data, isLoading, balance, NFT };
};

export default useUser;
