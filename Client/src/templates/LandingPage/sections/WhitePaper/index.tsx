import Button from "../../../../components/Button";
import * as S from "../../styles";
import * as IS from "./styles";

const WhitePaper = () => {
  return (
    <IS.Container>
      <IS.Main>
        <S.H1>Leia nosso white paper</S.H1>
        <S.Text>
          White paper é um documento informativo que busca descrever as
          características e promover um produto, serviço ou solução que uma
          determinada entidade oferece ou pretende oferecer.
        </S.Text>
        <Button value="CONHEÇA NOSSO PROJETO" />
      </IS.Main>
    </IS.Container>
  );
};

export default WhitePaper;
