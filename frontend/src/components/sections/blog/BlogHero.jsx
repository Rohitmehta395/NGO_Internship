import React from "react";
import Banner from "../../common/Banner";
import blogBgImage from "../../../assets/blogs/blog_bg_image2.webp";
import { useLocation } from "react-router-dom";

const BlogHero = () => {
  const location = useLocation();
  return (
    <Banner
      image={blogBgImage}
      title="Our Latest Articles"
      currentPath={location.pathname}
    />
  );
};

export default BlogHero;
