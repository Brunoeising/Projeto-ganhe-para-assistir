import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { NFT, UserBody } from "../../@types";
import useEthers from "../services/ethers";
import { saveUserInMongo, getUserAndNFTInfoByWallet } from "../functions";
import { useRouter } from "next/router";
import api from "../services/api";

export type Web3ContextType = {
  currentWallet: string;
  connected: boolean;
  connect: () => Promise<void>;
  create: (user: UserBody) => Promise<void>;
  loading: boolean;
  hasWalletInMongo: boolean | undefined;
  NFT: NFT | undefined;
  currentChainId: number;
  disconnectUser: () => void;
};

const Web3Context = createContext({} as Web3ContextType);

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [currentWallet, setCurrentWallet] = useState<string>("");
  const [NFT, setNFT] = useState<NFT>();
  const [connected, setConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasWalletInMongo, setHasWalletInMongo] = useState<
    boolean | undefined
  >();
  const [currentChainId, setCurrentChainId] = useState<number>(0);
  const { provider, metamask, getConnectedWallets, requestWallets } =
    useEthers();
  const router = useRouter();

  const disconnectUser = () => {
    setConnected(false);
    setHasWalletInMongo(false);
  };

  const handleSaveWalletAndUserInStates = async (
    wallet: string,
    connect: boolean
  ) => {
    setCurrentWallet(wallet);
    if (!connect) {
      disconnectUser();
      delete api.defaults.headers["Authorization"];
      return;
    }
    if (connect) {
      const data = await getUserAndNFTInfoByWallet(wallet);
      if (!data) return disconnectUser();
      if (data?.user.wallet !== wallet) return disconnectUser();
      setNFT(data.NFT);
      setConnected(true);
      setHasWalletInMongo(true);
      return data;
    }
  };

  useEffect(() => {
    if (!provider || !metamask) return;
    const tryConnect = async () => {
      try {
        const [wallet] = await getConnectedWallets();
        if (wallet) {
          await handleSaveWalletAndUserInStates(wallet, true);
        } else {
          await handleSaveWalletAndUserInStates("", false);
        }
      } catch (error: any) {
        disconnectUser();
      } finally {
        setLoading(false);
      }
    };
    tryConnect();

    metamask.on("accountsChanged", () => {
      tryConnect();
    });

    metamask.on("chainChanged", (chainId: string) => {
      setCurrentChainId(parseInt(chainId));
    });
  }, [provider, metamask]);

  useEffect(() => {
    if (!provider || !currentWallet) return;
    const chainId = provider?.network?.chainId;
    chainId && setCurrentChainId(chainId);
  }, [currentWallet, provider]);

  const connect = async () => {
    if (!provider) return;
    try {
      setLoading(true);
      const [wallet] = await requestWallets();
      if (!wallet) return;

      const userData = await handleSaveWalletAndUserInStates(wallet, true);
      if (!userData) return;

      router.push("/");
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const create = async ({ username }: UserBody) => {
    if (!provider) return;
    try {
      setLoading(true);
      if (currentWallet) {
        await saveUserInMongo(username, currentWallet);
        await handleSaveWalletAndUserInStates(currentWallet, true);

        router.push("/");
        return;
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        currentWallet,
        connected,
        connect,
        create,
        loading,
        hasWalletInMongo,
        NFT,
        currentChainId,
        disconnectUser,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
