import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = ({ image, title, currentPath }) => {
  // Generate breadcrumb from current route path
  const getBreadcrumb = () => {
    if (!currentPath) return title;
    const paths = currentPath.split("/").filter(Boolean);
    const lastPath = paths.length > 0 ? paths[paths.length - 1] : title;
    // Convert kebab-case to Title Case (e.g., "about-us" -> "About Us")
    return lastPath
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const breadcrumb = getBreadcrumb();

  const navigate = useNavigate();

  return (
    <div className="relative h-96 w-full -mt-[80px]">
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay - 60% opacity */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          {title}
        </h1>
        <div className="text-lg md:text-xl font-medium bg-gray-700 px-3 py-1.5 rounded-3xl">
          <span
            onClick={() => navigate("/")}
            className="hover:text-gray-300 transition-colors cursor-pointer"
          >
            Home
          </span>
          <span className="mx-2">&gt;&gt;</span>
          <span>{breadcrumb}</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
