import * as S from "./styles";
import useHeader from "./hooks/useHeader";
import { useWeb3 } from "../../context/Web3Context";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/Button";

const HeaderLanding = () => {
  const { connect, connected, hasWalletInMongo, currentWallet, loading } =
    useWeb3();
  const { isVisible } = useHeader();

  const handleConnect = async () => {
    if (!connected) {
      try {
        await connect();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <S.Container isVisible={isVisible}>
      <S.Logo>
        <Image
          src="https://i.imgur.com/WsJXkcr.png"
          alt="Logo"
          height={100}
          width={200}
          style={{
            width: "60%",
            height: "100%",
          }}
        />
      </S.Logo>
      <S.Options>
        <S.Option>
          <a href="#plans">Assinaturas</a>
        </S.Option>
        {connected && hasWalletInMongo && (
          <S.Option>
            <Link href={"/dashboard"}>
              <p>Minha conta</p>
            </Link>
          </S.Option>
        )}
        {currentWallet && !hasWalletInMongo && !loading && (
          <S.Option>
            <a href="#plans">Comprar NFT</a>
          </S.Option>
        )}
        {!currentWallet && !hasWalletInMongo && (
          <Button onClick={handleConnect} width={130} value="CONECTAR" />
        )}
      </S.Options>
    </S.Container>
  );
};

export default HeaderLanding;
