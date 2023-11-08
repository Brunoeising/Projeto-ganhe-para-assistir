import axios from "axios";
import { useQuery } from "react-query";

const apikey = process.env.YOUTUBE_API_KEY;

const handleSearch = async (q: string) => {
  try {
    if (!q) return;
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&maxResults=5&key=${apikey}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const useSearch = (query: string) =>
  useQuery(["string", query], () => handleSearch(query));

export default useSearch;
