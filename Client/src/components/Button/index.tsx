import * as S from "./styles";

type ButtonProps = {
  width?: string | number;
  value: string;
  onClick?: (params: any | null) => void;
  disabled?: boolean;
  type?: "submit" | "button";
  colored?: boolean;
};

const Button = ({
  width,
  value,
  onClick,
  disabled,
  type,
  colored = true,
}: ButtonProps) => {
  return (
    <S.Button
      type={type}
      disabled={disabled}
      colored={colored}
      onClick={onClick}
      width={width}
    >
      <S.ButtonText colored={colored}>{value}</S.ButtonText>
    </S.Button>
  );
};

export default Button;
