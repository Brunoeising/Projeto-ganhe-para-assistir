import { useEffect } from "react";
import { useRouter } from "next/router";

const useResetScroll = () => {
  const location = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

export default useResetScroll;
