import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BGAboutus from "../../../assets/AboutUsPics/BGAboutus.webp";
import Banner from "../../common/Banner";
import { heroImagesAPI } from "../../../services/api";
import { API_BASE_URL } from "../../../utils/constants";

const AboutHero = () => {
  const location = useLocation();
  const [heroImage, setHeroImage] = useState(BGAboutus);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const { data } = await heroImagesAPI.get("about");
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
      title="About Us"
      currentPath={location.pathname}
    />
  );
};

export default AboutHero;
