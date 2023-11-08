import axios from "axios";
import api from "../../api";

type SaqueParams = {
  value: number;
  wallet: string;
};

type PedidoSaque = {
  _id: string;
  user_id: string;
  username: string;
  userEarnedTokens: number;
  valor: number;
  nft: string;
  videosAssistidos: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export const WVWServices = {
  getChartInfo: async () => {
    try {
      const oneHourAgo = new Date().getTime() - 3600000;
      const now = new Date().getTime();
      const respose = axios.get(
        `https://app.geckoterminal.com/contracts/1/candlesticks.json?token_id=21809249&pool_id=158721149&resolution=15&from=${oneHourAgo}&to=${now}&for_update=false&count_back=329&currency=usd`
      );
      return respose;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  solicitarSaque: async (data: SaqueParams) => {
    try {
      const respose = await api.post("/saque", data);
      return respose;
    } catch (error: any) {
      return error;
    }
  },
  getSolicitacoesSaque: async () => {
    try {
      const { data } = await api.get<PedidoSaque[]>("/saque");
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
