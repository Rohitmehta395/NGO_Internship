import React, { useRef, useEffect, useState } from "react";
import { videoTestimonialsAPI } from "../../../services/api.js";

const VideoTestimonials = () => {
  const carouselRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [expanded, setExpanded] = useState(null);

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
    carouselRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (videos.length < 4) return;
    const id = setInterval(() => scroll("right"), 4000);
    return () => clearInterval(id);
  }, [videos]);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  if (!videos.length) {
    return (
      <div className="text-center py-10">No video testimonials available.</div>
    );
  }

  return (
    <section className="bg-[#fafafa] px-4 py-12 font-[Poppins] overflow-x-hidden">
      <h2 className="text-center font-[Quicksand] text-[#ED9121] text-2xl md:text-4xl font-bold">
        Video Testimonials
      </h2>
      <p className="text-center text-gray-600 mt-2 mb-10">
        Real voices. Real impact.
      </p>

      <div className="relative max-w-6xl mx-auto">
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#ED9121] text-white flex items-center justify-center md:left-[-20px] z-10"
        >
          &#8249;
        </button>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-2 scrollbar-hide"
        >
          {videos.map((v) => {
            const isExpanded = expanded === v._id;
            const text =
              !isExpanded && v.description.length > 160
                ? v.description.slice(0, 160) + "..."
                : v.description;

            return (
              <div
                key={v._id}
                className="flex-shrink-0 w-[300px] bg-white rounded-xl shadow-md transition hover:-translate-y-1"
              >
                <iframe
                  src={getEmbedUrl(v.ytLink)}
                  title={v.name}
                  className="w-full h-48 rounded-t-xl border-b-4 border-[#ED9121]"
                  allowFullScreen
                />

                <div className="p-4">
                  <h3
                    className="font-semibold text-base leading-tight line-clamp-2 min-h-[2.5rem]"
                    title={v.name}
                  >
                    {v.name}
                  </h3>

                  <p className="text-[#ED9121] font-semibold text-sm mt-1">
                    {v.title}
                  </p>

                  <p className="text-sm text-gray-600 mt-2">{text}</p>

                  {v.description.length > 160 && (
                    <button
                      onClick={() => setExpanded(isExpanded ? null : v._id)}
                      className="text-[#ED9121] font-semibold text-sm mt-2"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#ED9121] text-white flex items-center justify-center md:right-[-20px] z-10"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default VideoTestimonials;
