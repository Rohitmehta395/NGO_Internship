import { useState, useEffect } from "react";

export default function Trustees({ trustees }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(trustees.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= trustees.length ? 0 : prev + itemsPerPage,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, trustees.length - itemsPerPage)
        : Math.max(0, prev - itemsPerPage),
    );
  };

  const visibleTrustees = trustees.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  useEffect(() => {
    if (isHovered || totalPages <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, totalPages, trustees.length]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-16 px-4 md:px-8 lg:px-12">
      {/* Orange decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-32 md:h-40 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 opacity-80 -z-0"></div>

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-2xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 md:mb-20 gap-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B0B45] text-center md:text-left">
            Trustees <span className="font-normal">(Karyakartas)</span>
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

        {/* Trustees Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {visibleTrustees.map((trustee, index) => (
            <div
              key={currentIndex + index}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="bg-gray-100 p-4">
                <div className="aspect-[3/4] rounded-lg overflow-hidden">
                  <img
                    src={trustee.image}
                    alt={trustee.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>

              {/* Name Badge */}
              <div className="px-6 py-4">
                <div className="bg-orange-400 rounded-full px-6 py-3 text-center">
                  <h2 className="text-xl md:text-1xl font-bold text-white">
                    {trustee.name}
                  </h2>
                </div>
              </div>

              {/* Know More Link */}
              <div className="px-6 pb-6">
                <a
                  href={trustee.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xl md:text-sm font-bold text-[#0B0B45] hover:text-orange-400 transition-colors underline"
                >
                  Know More
                </a>
              </div>
            </div>
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
