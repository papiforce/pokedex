import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
    isSmallMobile: window.innerWidth <= 375,
    isMobile: window.innerWidth > 375 && window.innerWidth <= 480,
    isTablet: window.innerWidth > 480 && window.innerWidth <= 768,
    isSmallDesktop: window.innerWidth > 768 && window.innerWidth <= 1024,
    isDesktop: window.innerWidth > 1024 && window.innerWidth <= 1280,
    isMaxDesktop: window.innerWidth > 1280 && window.innerWidth <= 1440,
  });

  useEffect(() => {
    const handleSize = () => {
      if (
        window.innerWidth !== size.width ||
        window.innerHeight !== size.height
      ) {
        setSize({
          height: window.innerHeight,
          width: window.innerWidth,
          isSmallMobile: window.innerWidth <= 375,
          isMobile: window.innerWidth <= 480,
          isTablet: window.innerWidth <= 768,
          isSmallDesktop: window.innerWidth <= 1024,
          isDesktop: window.innerWidth <= 1280,
          isMaxDesktop: window.innerWidth <= 1440,
        });
      }
    };
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [size]);

  return size;
}
