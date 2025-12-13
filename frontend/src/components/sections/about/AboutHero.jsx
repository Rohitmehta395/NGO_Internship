import React from "react";
import { useLocation } from "react-router-dom";
import BGAboutus from "../../../assets/AboutUsPics/BGAboutus.png";
import Banner from "../../common/Banner";

const AboutHero = () => {
  const location = useLocation();
  return (
    <Banner
      image={BGAboutus}
      title="About Us"
      currentPath={location.pathname}
    />
  );
};

export default AboutHero;
