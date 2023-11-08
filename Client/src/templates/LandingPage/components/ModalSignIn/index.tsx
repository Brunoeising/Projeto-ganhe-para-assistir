import React, { FormEvent, useState } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { useWeb3 } from "../../../../context/Web3Context";
import { useModal } from "../../context/ModalContext";
import * as S from "./styles";

type MessageType = {
  message: string;
  error: boolean;
};

const ModalSignIn = () => {
  const { isOpen, setIsOpen } = useModal();
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<MessageType | null>();

  const { create, loading } = useWeb3();

  const handleConnectMetaMask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username)
      return setMessage({ message: "Preencha o campo", error: true });
    try {
      const response = await create({ username });
      setMessage({ message: "Usuario criado com sucesso", error: false });
    } catch (error: any) {
      console.log(error);
      setMessage({ message: error.message, error: true });
    }
  };

  return (
    <S.Container isOpen={isOpen}>
      <S.Modal>
        <S.Title>
          <h1>Como deveriamos te chamar?</h1>
        </S.Title>
        <S.FormArea onSubmit={handleConnectMetaMask}>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Seu nome de usuario"
            width="75%"
          />

          <Button
            type="submit"
            value={loading ? "Carregando..." : "Conectar"}
            width="20%"
            disabled={loading}
          />
        </S.FormArea>
        {message ? (
          <S.Message error={message.error}>{message.message}</S.Message>
        ) : null}
      </S.Modal>
    </S.Container>
  );
};

export default ModalSignIn;
