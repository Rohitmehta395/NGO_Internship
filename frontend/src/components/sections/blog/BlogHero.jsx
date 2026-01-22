import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../../common/Banner";
import blogBgImage from "../../../assets/blogs/blog_bg_image.webp";
import { heroImagesAPI } from "../../../services/api";
import { API_BASE_URL } from "../../../utils/constants";

const BlogHero = () => {
  const location = useLocation();
  const [heroImage, setHeroImage] = useState(blogBgImage);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const { data } = await heroImagesAPI.get("blogs");
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
      title="Our Latest Articles"
      currentPath={location.pathname}
    />
  );
};

export default BlogHero;
