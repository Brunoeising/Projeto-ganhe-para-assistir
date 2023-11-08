import { CircularProgress } from "@mui/material";
import * as S from "./styles";

const LoadingScreen = () => {
  return (
    <S.Container>
      <CircularProgress color="secondary" />
    </S.Container>
  );
};

export default LoadingScreen;
