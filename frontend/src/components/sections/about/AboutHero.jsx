import React from "react";
import { useLocation } from "react-router-dom";
import backgroundImage from "../../../assets/aboutUsBackgroundImage.webp";
import Banner from "../../common/Banner";

const AboutHero = () => {
  const location = useLocation();
  return (
    <Banner
      image={backgroundImage}
      title="About Us"
      currentPath={location.pathname}
    />
  );
};

export default AboutHero;
