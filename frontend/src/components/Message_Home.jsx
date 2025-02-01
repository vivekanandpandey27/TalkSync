import { useState, useEffect } from "react";
import MobilePage from "./MobilePage"; // Page for small screens
// import MessgeContainer from "./MessgeContainer"; // Page for large screens
import DesktopPage from "./DesktopPage";

const ResponsiveComponent = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust breakpoint as needed

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 888);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobilePage /> : < DesktopPage/>;
};

export default ResponsiveComponent;
