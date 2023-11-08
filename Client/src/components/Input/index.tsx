import * as S from "./styles";

type InputProps = {
  width?: string;
  height?: string;
  padding?: string;
  placeholder?: string;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: InputProps) => {
  return (
    <>
      <S.Input
        onChange={props.onChange}
        placeholder={props.placeholder}
        {...props}
      />
    </>
  );
};

export default Input;
