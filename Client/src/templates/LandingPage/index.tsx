import HeaderLanding from "../../components/HeaderLanding";
import Modal from "../../components/Modal";
import { useWeb3 } from "../../context/Web3Context";
import ModalSignIn from "./components/ModalSignIn";
import ModalProvider from "./context/ModalContext";
import Mockups from "./sections/Mockups";
import Plans from "./sections/Plans";
import Presentation from "./sections/Presentation";
import WhitePaper from "./sections/WhitePaper";
import * as S from "./styles";

const LandingPage = () => {
  return (
    <ModalProvider>
      <S.Container>
        <ModalSignIn />
        <HeaderLanding />
        <Presentation />
        <Plans />
        <Mockups />
        <WhitePaper />
      </S.Container>
    </ModalProvider>
  );
};

export default LandingPage;
