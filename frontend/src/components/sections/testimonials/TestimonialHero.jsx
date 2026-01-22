import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import backgroundImage from "../../../assets/testimonialbackgroundimage.webp";
import Banner from "../../common/Banner";
import { heroImagesAPI } from "../../../services/api";
import { API_BASE_URL } from "../../../utils/constants";

const TestimonialHero = () => {
  const location = useLocation();
  const [heroImage, setHeroImage] = useState(backgroundImage);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const { data } = await heroImagesAPI.get("testimonials");
        if (data.success && data.data.imageUrl) {
          setHeroImage(`${API_BASE_URL}${data.data.imageUrl}`);
        }
      } catch (error) {
        // Fallback to default imported image
      }
    };
    fetchHeroImage();
  }, []);

  return (
    <Banner
      image={heroImage}
      title="Testimonials"
      currentPath={location.pathname}
    />
  );
};

export default TestimonialHero;
