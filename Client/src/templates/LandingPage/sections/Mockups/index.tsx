import Image from "next/image";
import * as S from "../../styles";
import * as IS from "./styles";

const Mockups = () => {
  return (
    <S.Section>
      <IS.Container>
        <S.Sphere scaleInPx={200} background="#7023809a" left="1%" top="18%" />
        <S.Sphere scaleInPx={200} background="#281357" right="1%" bottom="0%" />
        <IS.ImageMockup>
          <Image
            height={500}
            width={500}
            style={{ width: "66%", height: "100%" }}
            src="/mockup.png"
            alt="mockup"
          />
        </IS.ImageMockup>
        <IS.TextArea>
          <S.H1>Assista do seu jeito</S.H1>
          <S.Text>
            Aproveite a tela grande da TV ou assista no tablet, laptop, celular
            e outros aparelhos. Nossa seleção de títulos em 4K não para de
            crescer. Além disso, para a felicidade de todos, é possível assistir
            em até 4 telas ao mesmo tempo.
          </S.Text>
        </IS.TextArea>
      </IS.Container>
    </S.Section>
  );
};

export default Mockups;
