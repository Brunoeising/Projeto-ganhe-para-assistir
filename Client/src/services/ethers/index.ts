import { ethers } from "ethers";
import { useEffect, useState } from "react";
import TicketSale from "../../../contracts/WVWTicketSale.json";
import Ticket from "../../../contracts/WVWTicket.json";
import Token from "../../../contracts/WVWToken.json";
import TokenPreSale from "../../../contracts/WVWPreSale.json";
import Withdraw from "../../../contracts/WVWWithdraw.json";
import { useWeb3 } from "../../context/Web3Context";

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider & {
      on: (event: string, callback: (params: any) => void) => void;

      networkVersion: string;
    };
  }
}

type Balance = {
  WVW: string;
  BNB: string;
};

type metamask = ethers.providers.ExternalProvider & {
  on: (event: string, callback: (params: any) => void) => void;
  off: (event: string, callback: (params: any) => void) => void;
};

const useEthers = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [metamask, setMetamask] = useState<metamask | any>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const { currentWallet, currentChainId } = useWeb3();

  const tokenAddress = "0x83E63a241bD0f4A9295Bab820A9f5eCA3035985F";
  const ticketAddress = "0x499cF0FC43b0B09e8b0466ea7733C77b5783D389";
  const ticketSaleAddress = "0xD015D834eB7dC343Fe1B0f4cDe3eEd0b5f87bb35";
  const withdrawAddress = "0xd448F4a22F8C989D4d1c2BDFE9B4e157C74b6c27";
  const tokenPreSaleAddress = "0x3dcC5fed696aE4279E46D9fD5635AF8a19A48Dc9";

  useEffect(() => {
    if (window.ethereum) {
      setMetamask(window.ethereum);
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
  }, [currentChainId]);

  useEffect(() => {
    if (!currentWallet) return;
    const signer = provider?.getSigner();
    setSigner(signer);
  }, [provider, currentWallet, currentChainId]);

  const getConnectedWallets = async () => {
    if (provider) return await provider.send("eth_accounts", []);
  };

  const requestWallets = async () => {
    try {
      if (provider) {
        const wallets = await provider.send("eth_requestAccounts", []);
        if (wallets) return wallets;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const getAllowance = async () => {
    try {
      if (provider && signer && currentWallet !== "") {
        const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
        const allowance = await contract.allowance(
          currentWallet,
          ticketSaleAddress
        );
        return allowance;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getBalance = async (
    currentWallet: string
  ): Promise<Balance | undefined> => {
    try {
      if (provider && signer && currentWallet !== "") {
        const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
        const balance = await contract.balanceOf(currentWallet);
        const BNBBalance = await provider.getBalance(currentWallet);
        const WVW = ethers.utils.formatEther(balance);
        const BNB = ethers.utils.formatEther(BNBBalance);

        return {
          WVW,
          BNB,
        };
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const buyNft = async (level: number) => {
    try {
      if (provider && signer && currentWallet !== "") {
        const contract = new ethers.Contract(
          ticketSaleAddress,
          TicketSale.abi,
          signer
        );

        const tx = await contract.buyTicket(level);
        const receipt = await tx.wait();
        if (receipt) return receipt;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const aprove = async (value: number) => {
    try {
      if (provider && signer) {
        const token = new ethers.Contract(tokenAddress, Token.abi, signer);

        const tx = await token.approve(ticketSaleAddress, value);

        const receipt = await tx.wait();
        if (receipt) return receipt;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const aproveWithdraw = async () => {
    try {
      if (provider && signer) {
        const contract = new ethers.Contract(ticketAddress, Ticket.abi, signer);
        const tx = await contract.setApprovalForAll(withdrawAddress, true);

        const receipt = await tx.wait();
        if (receipt) return receipt;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const checkIfIsAproved = async () => {
    try {
      if (provider && signer) {
        const contract = new ethers.Contract(ticketAddress, Ticket.abi, signer);
        const isAproved = await contract.isApprovedForAll(
          currentWallet,
          withdrawAddress
        );
        return isAproved;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const getMinMaxAmountToWithdraw = async () => {
    try {
      if (provider && signer) {
        const contract = new ethers.Contract(
          withdrawAddress,
          Withdraw.abi,
          signer
        );
        const minInWei = await contract.getMinWithdraw();
        const maxInWei = await contract.getMaxWithdraw();

        const min = ethers.utils.formatEther(minInWei);
        const max = ethers.utils.formatEther(maxInWei);

        return {
          min: Number(min),
          max: Number(max),
        };
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const getNftPlansPrice = async () => {
    try {
      if (provider && signer && currentWallet !== "") {
        const contract = new ethers.Contract(
          ticketSaleAddress,
          TicketSale.abi,
          signer
        );

        const nftsPrices = await contract.getNFTPlansPrice();

        return nftsPrices;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const buyTokens = async () => {
    try {
      if (provider && signer && currentWallet !== "") {
        const contract = new ethers.Contract(
          tokenPreSaleAddress,
          TokenPreSale.abi,
          signer
        );
        const valueToBuy = "20000";
        const tokenPrice = await contract.getTokenPrice();
        const valueBigNumberToBuy = ethers.BigNumber.from(valueToBuy).mul(
          ethers.BigNumber.from(tokenPrice)
        );
        const tx = await contract.buyTokens(valueToBuy, {
          value: valueBigNumberToBuy,
          from: currentWallet,
        });
        const receipt = await tx.wait();
        console.log(receipt);
        if (receipt) return receipt;
      }
    } catch (error: any) {
      throw new Error(error.data.message);
    }
  };

  const addTokenToMetamask = async () => {
    try {
      if (provider && metamask && currentWallet !== "") {
        await metamask.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: tokenAddress,
              symbol: "WVW",
              decimals: 18,
            },
          },
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    provider,
    metamask,
    getConnectedWallets,
    requestWallets,
    buyNft,
    getNftPlansPrice,
    signer,
    getAllowance,
    aprove,
    aproveWithdraw,
    getBalance,
    buyTokens,
    addTokenToMetamask,
    checkIfIsAproved,
    getMinMaxAmountToWithdraw,
  };
};

export default useEthers;
