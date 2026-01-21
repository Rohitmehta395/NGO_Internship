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
      const scrollAmount = 350; // Card width + gap
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
    <section className="bg-[#f8f9fa] py-24 font-[Poppins] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-[#ED9121] font-bold tracking-wider uppercase text-sm block mb-2">
              Watch Their Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#082D50] font-[Quicksand]">
              Video Testimonials
            </h2>
          </div>

          {/* Custom Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#ED9121] hover:text-white hover:border-[#ED9121] transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-[#082D50] flex items-center justify-center text-white hover:bg-[#ED9121] transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {videos.map((v) => (
              <div
                key={v._id}
                className="flex-shrink-0 w-[320px] md:w-[400px] snap-center bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group"
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

                <div className="p-6 relative">
                  {/* Decorative Quote Icon */}
                  <div className="absolute -top-5 right-6 w-10 h-10 bg-[#ED9121] rounded-full flex items-center justify-center text-white shadow-md">
                    <PlayCircle className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-bold text-[#082D50] mb-1 line-clamp-1">
                    {v.name}
                  </h3>
                  <p className="text-[#ED9121] font-medium text-sm mb-4 uppercase tracking-wide">
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
