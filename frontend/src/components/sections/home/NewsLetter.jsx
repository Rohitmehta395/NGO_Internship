import React, { useState } from "react";
import { Heart, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import ArticleCard from "../../common/cards/ArticleCard";
import OrangeButton from "../../common/buttons/OrangeButton";

export default function NewsLetter() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample blog data - replace with your actual data
  const blogs = [
    {
      id: 1,
      date: "10",
      month: "Dec",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
      author: "Admin",
      title:
        "Bridging Barriers, Building Futures: Sulabh App 2.0 Ignites Learn",
    },
    {
      id: 2,
      date: "15",
      month: "Dec",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
      author: "Admin",
      title:
        "Bridging Barriers, Building Futures: Sulabh App 2.0 Ignites Learn",
    },
    {
      id: 3,
      date: "20",
      month: "Dec",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
      author: "Admin",
      title: "Empowering Education Through Technology and Innovation",
    },
    {
      id: 4,
      date: "25",
      month: "Dec",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
      author: "Admin",
      title: "Creating Impact: Stories from Our Community Programs",
    },
  ];

  const itemsPerPage = 2;
  const maxIndex = Math.max(0, blogs.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleReadMore = (blogId) => {
    console.log("Read more clicked for blog:", blogId);
    // Add your navigation logic here
  };

  return (
    <div className="w-full bg-gray-50 px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 text-orange-500 mb-3">
              <Heart className="w-6 h-6 fill-current" />
              <span className="font-semibold text-lg">Latest Blogs</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Read Our Latest
              <br />
              NewsLetter
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-14 h-14 rounded-full border-2 border-gray-900 flex items-center justify-center transition-all ${
                currentIndex === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-900 hover:text-white"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`w-14 h-14 rounded-full border-2 border-gray-900 flex items-center justify-center transition-all ${
                currentIndex >= maxIndex
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-900 hover:text-white"
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Blog Cards Carousel */}
        <div className="overflow-hidden mb-12">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="w-full md:w-1/2 flex-shrink-0 px-3 mb-4"
              >
                <ArticleCard
                  date={blog.date}
                  month={blog.month}
                  image={blog.image}
                  author={blog.author}
                  title={blog.title}
                  onReadMore={() => handleReadMore(blog.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe Button */}
        <div className="flex justify-center">
          <OrangeButton work="Subscribe To Our NewsLetter" />
        </div>
      </div>
    </div>
  );
}
