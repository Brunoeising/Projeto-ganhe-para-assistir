import { useRouter } from "next/router";
import Header from "../../components/Header";
import useUser from "../../hooks/useUser";
import Button from "./components/Button";
import CardDashboard from "./components/CardDashboard";
import Chart from "./components/Chart";
import UserArea from "./components/UserArea";
import * as S from "./styles";

const Dashboard = () => {
  const { balance, data, isLoading, NFT } = useUser();
  const { push } = useRouter();

  const handleOpenPancakeSwap = () => {
    window.open(
      "https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x8a9c4dfe8b9d8962b31e4e16f8321c44d48e246e",
      "_blank"
    );
  };

  return (
    <S.Container>
      <Header />
      <S.Dashboard>
        <S.InformationsArea>
          <div>
            <h1>Olá, bem vindo a sua dashboard</h1>
            <p>
              aqui você pode ver suas estatisticas, comprar ou sacar seus coins
            </p>
          </div>
          <S.ButtonsArea>
            <Button onClick={() => push("/saque")}>SACAR</Button>

            <Button disabled>COMPRAR WVW</Button>
            <Button onClick={handleOpenPancakeSwap}>PANCAKESWAP</Button>
          </S.ButtonsArea>
          <S.CardsArea>
            <CardDashboard
              title="Total de coins"
              number={data?.saldo as number}
              isGradient
              isCoin
              isLoading={isLoading}
            />
            <CardDashboard
              title="Saldo na carteira"
              number={balance?.WVW as string}
              isCoin
              isLoading={!balance}
            />
          </S.CardsArea>
          <div>
            <h1>Valor da WVW Coin</h1>
            <div className="chart">
              <Chart />
            </div>
          </div>
        </S.InformationsArea>
        <UserArea user={data!} nft={NFT} />
      </S.Dashboard>
    </S.Container>
  );
};

export default Dashboard;
