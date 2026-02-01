import { useState, useEffect } from "react";
import AdvisoryCard from "../../common/cards/AdvisoryCard";

export default function AdvisoryBoard({ members, backgroundImage }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(members.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= members.length ? 0 : prev + itemsPerPage,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, members.length - itemsPerPage)
        : Math.max(0, prev - itemsPerPage),
    );
  };

  const visibleMembers = members.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  useEffect(() => {
    if (isHovered || totalPages <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, totalPages, members.length]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>
      )}

      {/* Fallback background if no image */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100"></div>
      )}

      {/* Content */}
      <div className="relative z-10 py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header with Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-6">
            <div className="text-center md:text-left w-full md:w-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#0B0B45]">
                Advisory Board Members
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-[#0B0B45]">
                (Our MargaDarshaks)
              </h2>
            </div>

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

          {/* Members Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {visibleMembers.map((member, index) => (
              <AdvisoryCard
                key={currentIndex + index}
                image={member.image}
                name={member.name}
                link={member.link}
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
    </div>
  );
}
