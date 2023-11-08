import { CircularProgress } from "@mui/material";
import * as S from "./styles";

type CardDashboardProps = {
  title: string;
  number: number | string;
  isGradient?: boolean;
  isCoin?: boolean;
  isLoading?: boolean;
};

const CardDashboard = ({
  title,
  number,
  isGradient,
  isCoin,
  isLoading,
}: CardDashboardProps) => {
  return (
    <S.Container isGradient={isGradient}>
      <h2>{title}</h2>
      {!isLoading ? (
        <h1>{isCoin ? `WVW ${number}` : number}</h1>
      ) : (
        <CircularProgress
          size={30}
          sx={{
            color: "#fff",
          }}
        />
      )}
    </S.Container>
  );
};

export default CardDashboard;
