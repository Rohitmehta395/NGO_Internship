import React from "react";
import { useLocation } from "react-router-dom";
import backgroundImage from "../../../assets/testimonialbackgroundimage.webp";
import Banner from "../../common/Banner";

const TestimonialHero = () => {
  const location = useLocation();
  return (
    <Banner
      image={backgroundImage}
      title="Testimonials"
      currentPath={location.pathname}
    />
  );
};

export default TestimonialHero;
