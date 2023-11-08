import VideoItem from "../VideoItem";
import * as S from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { Video } from "../../../@types";

type RowVideosProps = {
  videos: Video[];
  title: string;
};

const RowVideos = ({ videos, title }: RowVideosProps) => {
  return (
    <S.Container>
      <S.Title>
        <h2>{title}</h2>
      </S.Title>
      <S.VideoList>
        <Swiper
          slidesPerView={"auto"}
          navigation={true}
          spaceBetween={10}
          slidesPerGroup={2}
          modules={[Navigation, A11y]}
          style={{
            paddingLeft: "2px",
          }}
        >
          {videos.map((video) => (
            <SwiperSlide key={video.snippet.resourceId?.videoId}>
              <VideoItem video={video} size="large" />
            </SwiperSlide>
          ))}
        </Swiper>
      </S.VideoList>
    </S.Container>
  );
};

export default RowVideos;
