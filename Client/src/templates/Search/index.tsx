import { useRouter } from "next/router";
import Header from "../../components/Header";
import * as S from "./styles";
import VideoItem from "../../components/VideoItem";
import { Video } from "../../../@types";
import useSearch from "./hooks/useSearch";

const Search = () => {
  const router = useRouter();
  const { data, isLoading } = useSearch(router.query.q as string);

  return (
    <S.Container>
      <Header />
      <S.Results>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          data?.items.map((video: Video) => (
            <VideoItem
              key={video.id.videoId}
              video={video}
              isRow
              size="large"
            />
          ))
        )}
      </S.Results>
    </S.Container>
  );
};

export default Search;
