// rohitmehta395/ngo_internship/NGO_Internship-2375488b1fc24f0088f61b60e9abdfa636c4624e/frontend/src/components/sections/testimonials/MediaTestimonial.jsx

import { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../../../utils/constants";
import { mediaAPI } from "../../../services/api.js";
import { Newspaper, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const MediaTestimonial = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the starting item

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await mediaAPI.getAll();
        setMediaItems(res.data.data || res.data || []);
      } catch (err) {
        console.error("Failed to fetch media:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const getFullImageUrl = (imageUrl) =>
    imageUrl
      ? `${IMAGE_BASE_URL}/uploads/${
          imageUrl.startsWith("media/") ? imageUrl : `media/${imageUrl}`
        }`
      : "https://placehold.co/600x400?text=News+Article";

  // Navigation Logic
  const nextSlide = () => {
    if (currentIndex + 3 < mediaItems.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading || mediaItems.length === 0) return null;

  // Only show 3 items starting from the currentIndex
  const visibleItems = mediaItems.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#ED9121] font-bold tracking-wider uppercase text-xs md:text-sm">
            In The News
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#082D50] mt-2 md:mt-3 font-[Quicksand]">
            Media Coverage
          </h2>
        </div>

        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute -left-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-lg border border-gray-100 transition-all ${
              currentIndex === 0
                ? "opacity-0 cursor-default"
                : "opacity-100 hover:bg-orange-50 text-[#ED9121]"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Grid Container (Always 3 Columns on Large Screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out">
            {visibleItems.map((item, i) => (
              <article
                key={item._id || i}
                className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 h-full"
              >
                <div className="w-full relative overflow-hidden h-60 shrink-0">
                  <div className="absolute top-4 left-4 z-10 bg-[#ED9121] text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    MEDIA
                  </div>
                  <img
                    src={getFullImageUrl(item.image)}
                    alt={item.title || "Media Coverage"}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <Newspaper className="w-4 h-4" />
                      <span className="font-semibold text-gray-600 uppercase tracking-wide text-xs">
                        {item.source}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-[#082D50] mb-3 leading-tight transition-colors line-clamp-2">
                      {item.title ||
                        (item.description && item.description.length > 60
                          ? item.description.slice(0, 60) + "..."
                          : "Media Feature Story")}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                    <span className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.date).toLocaleDateString()}
                    </span>

                    <a
                      href={item.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#ED9121] hover:underline flex items-center gap-1"
                    >
                      Read Article &rarr;
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={currentIndex + 3 >= mediaItems.length}
            className={`absolute -right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-lg border border-gray-100 transition-all ${
              currentIndex + 3 >= mediaItems.length
                ? "opacity-0 cursor-default"
                : "opacity-100 hover:bg-orange-50 text-[#ED9121]"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Optional: Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.max(0, mediaItems.length - 2) }).map(
            (_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === idx ? "w-6 bg-[#ED9121]" : "w-2 bg-gray-200"
                }`}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default MediaTestimonial;
