import { Alert, CircularProgress } from "@mui/material";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import Modal from "../../../../components/Modal";
import useEthers from "../../../../services/ethers";
import * as S from "../../styles";
import usePlans from "./hooks/usePlans";
import * as IS from "./styles";

const plans = [
  {
    level: 0,
    title: "Ticket NFT 3 dias",
    description: "Duração 3 dias (1 saque)",
    rendimento: "0% - 500 WVW",
    aproximado: "$0,85",
    isEmphasis: false,
  },
  {
    level: 1,
    title: "Ticket NFT 21 dias",
    description: "Duração 21 dias (6 saques)",
    rendimento: "18%",
    aproximado: "$35,00",
    isEmphasis: true,
  },
  {
    level: 2,
    title: "Ticket NFT 30 dias",
    description: "Duração 30 dias (6 saques)",
    rendimento: "40%",
    aproximado: "$103,00",
    isEmphasis: false,
  },
];

const Plans = () => {
  const {
    allowense,
    connected,
    error,
    handleAprove,
    handleBuyNft,
    isOnRightChain,
    loading,
    loadingMessage,
    plansPrices,
    currentWallet,
    balance,
    handleBuyTokens,
  } = usePlans();
  const { addTokenToMetamask } = useEthers();

  return (
    <S.Section id="plans">
      <Modal isOpen={!!error} description={error!} title="Ocorreu um erro" />
      <IS.Container>
        <S.H1>Compre WVW com BNB da TESTNET.</S.H1>
        {currentWallet && (
          <IS.ButtonsArea>
            <IS.CurrentBalance>
              Saldo atual: <b>{Number(balance?.WVW || 0).toFixed(2)}</b> WVW
            </IS.CurrentBalance>
            <IS.CurrentBalance>
              <b>{Number(balance?.BNB || 0).toFixed(4)}</b> BNB
            </IS.CurrentBalance>
          </IS.ButtonsArea>
        )}
        <IS.ButtonsArea>
          <Button
            width={"45%"}
            value="BUY 20000 WVW"
            onClick={handleBuyTokens}
            disabled={!currentWallet || !isOnRightChain || loading}
          />
          <Button
            width={"45%"}
            value="IMPORTAR TOKEN"
            onClick={addTokenToMetamask}
            disabled={!currentWallet || !isOnRightChain || loading}
          />
        </IS.ButtonsArea>

        <S.H1>Escolha sua NFT</S.H1>
        {!isOnRightChain && (
          <Alert severity="error">
            Você precisa {!currentWallet && "estar conectado e"} estar na rede
            BSC Testnet para comprar uma NFT
          </Alert>
        )}
        {currentWallet && !connected && !loading && isOnRightChain && (
          <Alert severity="info">
            Você precisa comprar uma NFT para assistir os vídeos e ganhar WVW's
          </Alert>
        )}
        {connected && !loading && isOnRightChain && (
          <Alert severity="success">
            Você já tem uma NFT, você já pode assistir os vídeos e ganhar WVW's
          </Alert>
        )}
        {loading && (
          <>
            <IS.Loading>
              <CircularProgress color="secondary" />
              <Alert severity="info">{loadingMessage}</Alert>
            </IS.Loading>
          </>
        )}
        <IS.CardsArea>
          {plans.map((plan) => (
            <Card
              key={plan.level}
              card={{
                ...plan,
                price: plansPrices ? plansPrices[plan.level] : "0",
              }}
              allowense={allowense}
              isEmphasis={plan.isEmphasis}
              onClick={{
                handleBuyNft: () => handleBuyNft(plan.level),
                handleAprove: (value) => handleAprove(value),
              }}
              disabled={connected || loading || !isOnRightChain}
            />
          ))}
        </IS.CardsArea>
      </IS.Container>
    </S.Section>
  );
};

export default Plans;
