import Header from "../../components/Header";
import * as S from "./styles";
import Input from "../../components/Input";
import Button from "../Dashboard/components/Button";
import { Alert, LinearProgress } from "@mui/material";
import useSaque from "./hooks/useSaque";

const Saque = () => {
  const {
    data,
    feedback,
    handleChange,
    handleWithdraw,
    setValue,
    percent95,
    value,
    handleAproveWithdraw,
    mutation: withdrawMutation,
    isAproved,
    isLoading,
    minMax,
  } = useSaque();

  return (
    <S.Container>
      <Header />
      <S.SaqueArea>
        <S.Texts>
          <S.Title>Solicitação de saque</S.Title>
          <S.Description>
            Você pode sacar ate no maximo <b>{minMax.max} WVW's</b>
            <br />e no minimo <b>{minMax.min} WVW's</b>
          </S.Description>
        </S.Texts>

        <S.ModalSaque>
          <S.InputArea>
            <span onClick={() => setValue(minMax.max)}>MAX</span>
            <Input
              value={value}
              onChange={handleChange}
              placeholder="Selecione o valor para o saque"
            />
          </S.InputArea>
          <S.Description>
            <b>{"(taxa de 5% por saque)"}</b>
          </S.Description>
          <S.Description>
            {Number(percent95 || 0).toFixed(2)} WVW’S serão enviados para a
            carteira <b>{data?.wallet}</b>
          </S.Description>

          <Button
            disabled={
              withdrawMutation.isLoading ||
              isLoading ||
              value < minMax.min ||
              value > minMax.max
            }
            onClick={isAproved ? handleWithdraw : handleAproveWithdraw}
            width="100%"
          >
            {!isLoading && !isAproved ? "Aprovar saque" : "Solicitar saque"}
          </Button>

          {withdrawMutation.isLoading && (
            <LinearProgress
              sx={{
                backgroundColor: "#212121",
                height: "10px",
                borderRadius: "3px",
                marginTop: "10px",
              }}
            />
          )}

          {feedback && (
            <Alert severity={feedback.type}>{feedback.message}</Alert>
          )}
        </S.ModalSaque>
      </S.SaqueArea>
    </S.Container>
  );
};

export default Saque;
