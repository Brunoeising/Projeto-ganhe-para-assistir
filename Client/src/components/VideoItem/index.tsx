import * as S from "./styles";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { Video } from "../../../@types";
import Image from "next/image";

type VideoItemProps = {
  isRow?: boolean;
  video?: Video;
  size?: "small" | "large";
};

const VideoItem = ({
  video,
  isRow = false,
  size = "small",
}: VideoItemProps) => {
  return (
    <S.Container isRow={isRow} size={size}>
      <Link href={`/watch/${video?.snippet.resourceId?.videoId}`}>
        <S.Thumbnail isRow={isRow} size={size}>
          <Image
            src={video?.snippet.thumbnails.medium.url!}
            alt={video?.snippet.title!}
            width={size === "small" ? 200 : 400}
            height={size === "small" ? 100 : 300}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </S.Thumbnail>
      </Link>

      <S.VideoDetails isRow={isRow} size={size}>
        {!isRow && (
          <S.UserPhoto>
            <FaUserCircle size={40} color={"#FFF"} />
          </S.UserPhoto>
        )}
        <S.VideoInfo>
          <S.VideoTitle>
            <h1>{video?.snippet.title}</h1>
          </S.VideoTitle>
          <S.VideoChannel>
            <h2>{video?.snippet.channelTitle}</h2>
          </S.VideoChannel>
        </S.VideoInfo>
      </S.VideoDetails>
    </S.Container>
  );
};

export default VideoItem;
