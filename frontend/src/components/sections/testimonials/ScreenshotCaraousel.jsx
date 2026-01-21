import React, { useRef, useEffect, useState } from "react";
import { screenshotsAPI } from "../../../services/api.js";
import { IMAGE_BASE_URL } from "../../../utils/constants";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";

const ScreenshotCarousel = () => {
  const carouselRef = useRef(null);
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const res = await screenshotsAPI.getAll();
        setScreenshots(res.data || []);
      } catch (err) {
        console.error("Failed to fetch screenshots:", err);
      }
    };
    fetchScreenshots();
  }, []);

  const getFullImageUrl = (imageUrl) =>
    imageUrl
      ? `${IMAGE_BASE_URL}/${imageUrl}`
      : "https://placehold.co/600x400?text=Letter";

  const scroll = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  if (screenshots.length === 0) return null;

  return (
    <section className="bg-white py-24 font-[Poppins] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Mail className="w-10 h-10 text-[#ED9121] mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-bold text-[#082D50] mb-4 font-[Quicksand]">
            Letters of Appreciation
          </h2>
          <p className="text-gray-500 text-lg">
            Words of encouragement and gratitude from our community and
            supporters.
          </p>
        </div>

        <div className="relative group">
          {/* Navigation Buttons (Visible on hover or mobile) */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-12 w-12 h-12 bg-white border border-gray-100 shadow-xl rounded-full flex items-center justify-center text-gray-700 hover:text-[#ED9121] z-20 transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-12 w-12 h-12 bg-white border border-gray-100 shadow-xl rounded-full flex items-center justify-center text-gray-700 hover:text-[#ED9121] z-20 transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto py-8 px-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {screenshots.map((img) => (
              <div
                key={img._id}
                className="flex-shrink-0 w-72 md:w-80 snap-center bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2"
              >
                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={getFullImageUrl(img.image)}
                    alt={img.alt || "Testimonial Letter"}
                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() =>
                      window.open(getFullImageUrl(img.image), "_blank")
                    }
                  />
                </div>
                {img.date && (
                  <div className="mt-4 flex justify-center">
                    <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-wide">
                      {new Date(img.date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotCarousel;
