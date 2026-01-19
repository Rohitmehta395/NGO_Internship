import React, { useRef, useEffect, useState } from "react";
import { screenshotsAPI } from "../../../services/api.js";
import { IMAGE_BASE_URL } from "../../../utils/constants";

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
      : "https://placehold.co/600x400?text=No+Image";

  const scroll = (dir) => {
    carouselRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (screenshots.length < 2) return;
    const id = setInterval(() => scroll("right"), 3000);
    return () => clearInterval(id);
  }, [screenshots]);

  if (screenshots.length === 0) {
    return <div className="text-center py-10">No letters available.</div>;
  }

  return (
    <section className="bg-white px-4 py-12 overflow-x-hidden font-[Poppins]">
      <h2 className="font-[Quicksand] text-[#ED9121] text-2xl md:text-4xl text-center mb-2">
        Testimonial Letters & Emails
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Gesture of Appreciation from Celebrities
      </p>

      <div className="relative max-w-6xl mx-auto">
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2
                     bg-[#ED9121] text-white w-9 h-9 rounded-full
                     flex items-center justify-center md:left-[-20px] z-10"
        >
          &#8249;
        </button>

        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-2 scrollbar-hide"
        >
          {screenshots.map((img) => (
            <div
              key={img._id}
              className="flex-shrink-0 w-60 md:w-72 bg-white rounded-xl
                         shadow-md p-3 transition hover:-translate-y-1"
            >
              <img
                src={getFullImageUrl(img.image)}
                alt={img.alt || "Testimonial Letter"}
                className="w-full h-72 object-contain rounded-md"
              />
              {img.date && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  {new Date(img.date).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2
                     bg-[#ED9121] text-white w-9 h-9 rounded-full
                     flex items-center justify-center md:right-[-20px] z-10"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default ScreenshotCarousel;
