import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Don't override scroll when navigating to a specific section anchor
    const params = new URLSearchParams(search);
    if (params.get("section")) return;

    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
