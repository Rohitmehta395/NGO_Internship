import React, { useState, useEffect } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../../common/cards/ArticleCard";
import OrangeButton from "../../common/buttons/OrangeButton";

import { blogsAPI } from "../../../services/api";
import { IMAGE_BASE_URL } from "../../../utils/constants";

export default function NewsLetter() {
  const [blogs, setBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const navigate = useNavigate();

  // Fetch Blogs from Backend
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await blogsAPI.getAll();
        const latestBlogs = res.data.data.slice(0, 4);
        setBlogs(latestBlogs);
      } catch (error) {
        console.error("Failed to load blogs");
      }
    };
    loadBlogs();
  }, []);

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, blogs.length - itemsPerPage);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerPage, maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleReadMore = (blog) => {
    if (blog.link) {
      window.open(blog.link, "_blank");
    } else {
      navigate(`/blog/${blog.slug}`);
    }
  };

  return (
    <div className="w-full bg-gray-50 px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12 gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-orange-500 mb-3">
              <Heart className="w-5 h-5 md:w-6 md:h-6 fill-current" />
              <span className="font-semibold text-lg">Latest Updates</span>
            </div>
            {/* UPDATED HEADER TITLE */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B0B45] leading-tight">
              Read our Blogs & <br />
              Newsletter
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4 self-end md:self-auto">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-900 flex items-center justify-center transition-all ${
                currentIndex === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-900 hover:text-white"
              }`}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-900 flex items-center justify-center transition-all ${
                currentIndex >= maxIndex
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-900 hover:text-white"
              }`}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Blog Cards Carousel */}
        <div className="overflow-hidden mb-12">
          <div
            className="flex transition-transform duration-500 ease-in-out mb-15"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {blogs.length > 0 ? (
              blogs.map((blog) => {
                const dateObj = new Date(blog.createdAt);
                const date = dateObj.getDate();
                const month = dateObj.toLocaleString("default", {
                  month: "short",
                });

                const imageUrl = blog.image
                  ? blog.image.startsWith("http")
                    ? blog.image
                    : `${IMAGE_BASE_URL}/${blog.image}`
                  : "https://placehold.co/600x400?text=No+Image";

                return (
                  <div
                    key={blog._id}
                    className="w-full md:w-1/2 shrink-0 px-3 h-full"
                  >
                    <ArticleCard
                      date={date}
                      month={month}
                      image={imageUrl}
                      author={blog.author || "Admin"}
                      title={blog.title}
                      desc={blog.description || "No description available."}
                      onReadMore={() => handleReadMore(blog)}
                    />
                  </div>
                );
              })
            ) : (
              <div className="w-full text-center py-10 text-gray-500">
                No articles published yet.
              </div>
            )}
          </div>
        </div>

        {/* Subscribe Button */}
        <div className="flex justify-center">
          <OrangeButton
            path="http://eepurl.com/ig_Vuz"
            work="Subscribe To Our NewsLetter"
          />
        </div>
      </div>
    </div>
  );
}
