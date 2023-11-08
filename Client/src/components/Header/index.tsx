import Image from "next/image";
import { FaHome, FaMoneyBill } from "react-icons/fa";
import { useWeb3 } from "../../context/Web3Context";
import useUser from "../../hooks/useUser";
import * as S from "./styles";

const Header = () => {
  const { data } = useUser();

  return (
    <S.Container>
      <S.NavItems>
        <S.NavIcon href="/">
          <FaHome size={30} />
        </S.NavIcon>
      </S.NavItems>
      <S.Main>
        <S.LogoArea>
          <Image
            alt="logo"
            src="/logo2.png"
            width={100}
            height={100}
            style={{ width: "65%", height: "100%" }}
          />
        </S.LogoArea>
      </S.Main>
      <S.User>
        <S.NavIcon href="/dashboard">
          <FaMoneyBill size={30} />
          <b>{data?.saldo} WVW</b>
        </S.NavIcon>
      </S.User>
    </S.Container>
  );
};

export default Header;
