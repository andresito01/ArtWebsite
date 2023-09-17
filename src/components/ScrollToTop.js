import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();
  console.log("Pathname", pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("ScrollToTop");
  }, [pathname]);

  return null;
};

export default ScrollToTop;
