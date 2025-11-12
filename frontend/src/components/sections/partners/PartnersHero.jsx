import React from "react";
import { useLocation } from "react-router-dom";
import backgroundImage from "../../../assets/partnersbackgroundimage.webp";
import Banner from "../../common/Banner";

const PartnersHero = () => {
  const location = useLocation();
  return (
    <Banner
      image={backgroundImage}
      title="Our Partners"
      currentPath={location.pathname}
    />
  );
};

export default PartnersHero;
