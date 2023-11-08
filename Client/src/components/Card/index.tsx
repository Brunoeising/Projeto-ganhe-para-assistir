import Button from "../Button";
import * as S from "./styles";
import { BigNumber, ethers } from "ethers";

type CardType = {
  title: string;
  price: string | number;
  description: string;
  rendimento?: string;
  aproximado?: string;
  level?: number;
};

type CardProps = {
  card: CardType;
  onClick?: {
    handleBuyNft: () => any;
    handleAprove: (difference: any) => any;
  };
  isEmphasis?: boolean;
  disabled?: boolean;
  allowense?: string;
};

const Card = ({
  card,
  onClick,
  isEmphasis = false,
  disabled,
  allowense,
}: CardProps) => {
  const hasAllowense = allowense && allowense !== "0";
  const priceInEth = ethers.utils.formatEther(card.price);
  const priceInWei = BigNumber.from(card.price);
  const needAprove = hasAllowense && priceInWei.gt(allowense!);

  return (
    <S.Card isEmphasis={isEmphasis}>
      {isEmphasis && <S.Label>EM DESTAQUE</S.Label>}
      <S.CardTitle>{card.title}</S.CardTitle>
      <S.Price>
        <>
          {(card.price && priceInEth) || "?"} <S.Currency>WVW</S.Currency>
        </>
      </S.Price>
      <div className="body">
        <S.CardDescription>{card.description}</S.CardDescription>

        <S.CardDescription>
          Rendimento <b>{card.rendimento}</b>
        </S.CardDescription>
        <S.CardDescription>
          Aproximadamente: <b>{card.aproximado}</b>
        </S.CardDescription>
      </div>
      <Button
        onClick={
          needAprove
            ? () => onClick?.handleAprove(card.price)
            : () => onClick?.handleBuyNft()
        }
        disabled={disabled || !hasAllowense}
        value={needAprove ? "APROVAR" : "COMPRAR"}
      />
    </S.Card>
  );
};

export default Card;
