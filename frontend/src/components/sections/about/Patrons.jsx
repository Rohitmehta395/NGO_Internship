import { useState, useEffect } from "react";
import PatronCard from "../../common/cards/PatronCard";

export default function Patrons({ patrons }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(patrons.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= patrons.length ? 0 : prev + itemsPerPage,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, patrons.length - itemsPerPage)
        : Math.max(0, prev - itemsPerPage),
    );
  };

  const visiblePatrons = patrons.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  useEffect(() => {
    if (isHovered || totalPages <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, totalPages]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-16 px-4 md:px-8 lg:px-12">
      {/* Orange decorative strip */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-32 md:h-40 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 opacity-80 -z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-16 md:mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B0B45]">
            Patrons & Donors - Our Lifeline
          </h1>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 md:w-14 md:h-14 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <svg
                className="w-6 h-6 md:w-7 md:h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="w-12 h-12 md:w-14 md:h-14 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <svg
                className="w-6 h-6 md:w-7 md:h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Patrons Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {visiblePatrons.map((patron, index) => (
            <PatronCard
              key={currentIndex + index}
              image={patron.image}
              name={patron.name}
              link={patron.link}
            />
          ))}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                className={`w-3 h-3 rounded-full transition-all ${
                  Math.floor(currentIndex / itemsPerPage) === index
                    ? "bg-orange-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
