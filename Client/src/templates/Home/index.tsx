import { Video } from "../../../@types";
import Header from "../../components/Header";
import RowVideos from "../../components/RowVideos";
import VideoCarrousel from "../../components/VideoCarrousel";
import * as S from "./styles";

type Parceiro = {
  channel_nome: string;
  channel_id: string;
  videos: Video[];
};

type HomeProps = {
  data: Parceiro[];
};

const Home = ({ data }: HomeProps) => {
  return (
    <S.Container>
      <Header />
      {/* <VideoCarrousel /> */}
      <S.FeedVideos>
        {data.map((parceiro) => (
          <RowVideos
            key={parceiro.channel_id}
            title={parceiro.channel_nome}
            videos={parceiro.videos}
          />
        ))}
      </S.FeedVideos>
    </S.Container>
  );
};

export default Home;
