import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AllPrograms from "../components/sections/programs/AllPrograms";
import Banner from "../components/common/Banner";
import programHeroImage from "../assets/programHero.webp";
import { heroImagesAPI } from "../services/api";
import { API_BASE_URL } from "../utils/constants";

const Programs = () => {
  const location = useLocation();
  const [heroImage, setHeroImage] = useState(programHeroImage);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const { data } = await heroImagesAPI.get("programs");
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
    <div>
      <Banner
        image={heroImage}
        title="Our Programs"
        currentPath={location.pathname}
      />
      <AllPrograms />
    </div>
  );
};

export default Programs;
