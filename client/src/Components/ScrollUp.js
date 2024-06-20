import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollUp({ trigger }) {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
        left: 0,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, trigger]);
  return null;
}

export default ScrollUp;
