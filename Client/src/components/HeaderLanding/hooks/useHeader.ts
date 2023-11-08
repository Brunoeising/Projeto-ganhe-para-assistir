import { useEffect, useRef, useState } from "react";

const useHeader = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      const isScrollingDown = currentScroll > lastScroll.current;

      if (isScrollingDown && isVisible) setIsVisible(false);
      if (!isScrollingDown && !isVisible) setIsVisible(true);

      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return {
    isVisible,
  };
};

export default useHeader;
