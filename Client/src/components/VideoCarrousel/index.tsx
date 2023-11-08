import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import * as S from "./styles";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

const VideoCarrousel = () => {
  return (
    <>
      <Swiper slidesPerView={1} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          <S.Video>
            <S.VideoThumbnail>
              <Link href={"/watch/p0gRLzD2Kn8"}>
                <Image
                  width={1080}
                  height={720}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src="https://i3.ytimg.com/vi/p0gRLzD2Kn8/maxresdefault.jpg"
                  alt="Video Thumbnail"
                />
                <S.GradientHorizontalFromBottom />
              </Link>
            </S.VideoThumbnail>
          </S.Video>
        </SwiperSlide>
        <SwiperSlide>
          <S.Video>
            <S.VideoThumbnail>
              <Link href={"/watch/7Pm2GgLGyw8"}>
                <Image
                  width={1080}
                  height={720}
                  style={{ height: "100%", width: "100%" }}
                  src="https://i3.ytimg.com/vi/7Pm2GgLGyw8/maxresdefault.jpg"
                  alt="Video Thumbnail"
                />
                <S.GradientHorizontalFromBottom />
              </Link>
            </S.VideoThumbnail>
          </S.Video>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default VideoCarrousel;
