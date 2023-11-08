import UserPhoto from "../../../../components/UserPhoto";
import { MdVerified } from "react-icons/md";
import * as S from "../../styles";
import { FaUserCircle } from "react-icons/fa";

type VideoDetailsProps = {
  videoDetails: {
    snippet: {
      title: string;
      description: string;
      channelId: string;
      channelTitle: string;
    };
    statistics: {
      viewCount: string;
    };
    isParceiro: boolean;
  };
};

const VideoDetails = ({ videoDetails }: VideoDetailsProps) => {
  return (
    <S.VideoDetails>
      <S.VideoInfo>
        <S.VideoTitle>
          <h1>{videoDetails?.snippet.title}</h1>
        </S.VideoTitle>
        <S.VideoViews>
          <h3>{videoDetails?.statistics.viewCount} visualizações</h3>
        </S.VideoViews>
      </S.VideoInfo>
      <S.VideoChannel>
        <FaUserCircle size={30} color={"#fff"} />
        <S.ChannelInfo>
          <S.ChannelName>
            <h2>{videoDetails?.snippet.channelTitle} </h2>
            {videoDetails?.isParceiro && (
              <MdVerified size={15} color={"ligthblue"} />
            )}
          </S.ChannelName>
          {/* <S.ChannelSubscribers>
            <h3>1000 inscritos</h3>
          </S.ChannelSubscribers> */}
        </S.ChannelInfo>
      </S.VideoChannel>
    </S.VideoDetails>
  );
};

export default VideoDetails;
