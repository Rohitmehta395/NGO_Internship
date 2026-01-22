import React, { useRef, useEffect, useState } from "react";
import { videoTestimonialsAPI } from "../../../services/api.js";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";

const VideoTestimonials = () => {
  const carouselRef = useRef(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await videoTestimonialsAPI.getAll();
        setVideos(res.data || []);
      } catch (err) {
        console.error("Failed to fetch video testimonials:", err);
      }
    };
    fetchVideos();
  }, []);

  const scroll = (dir) => {
    if (carouselRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? window.innerWidth * 0.85 : 400;
      carouselRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  if (!videos.length) return null;

  return (
    <section className="bg-[#f8f9fa] py-16 md:py-24 font-[Poppins] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CENTERED HEADER (Matched with other sections) */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#ED9121] font-bold tracking-wider uppercase text-xs md:text-sm block mb-2">
            Watch Their Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#082D50] font-[Quicksand] leading-tight">
            Video Testimonials
          </h2>
        </div>

        <div className="relative group">
          {/* NAVIGATION BUTTONS (Absolute positioned like ScreenshotCarousel) */}
          {/* Hidden on mobile (swipe is better), visible on tablet/desktop */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-12 w-12 h-12 bg-white border border-gray-100 shadow-xl rounded-full items-center justify-center text-gray-700 hover:text-[#ED9121] z-20 transition-all hover:scale-110 cursor-pointer"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-12 w-12 h-12 bg-white border border-gray-100 shadow-xl rounded-full items-center justify-center text-gray-700 hover:text-[#ED9121] z-20 transition-all hover:scale-110 cursor-pointer"
            aria-label="Next video"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* CAROUSEL */}
          <div
            ref={carouselRef}
            className="flex gap-4 md:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {videos.map((v) => (
              <div
                key={v._id}
                className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[400px] snap-center bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                {/* Video Container */}
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    src={getEmbedUrl(v.ytLink)}
                    title={v.name}
                    className="w-full h-full"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                <div className="p-5 md:p-6 relative">
                  {/* Decorative Play Icon */}
                  <div className="absolute -top-5 right-6 w-10 h-10 bg-[#ED9121] rounded-full flex items-center justify-center text-white shadow-md">
                    <PlayCircle className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-[#082D50] mb-1 line-clamp-1">
                    {v.name}
                  </h3>
                  <p className="text-[#ED9121] font-medium text-xs md:text-sm mb-4 uppercase tracking-wide">
                    {v.title}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
