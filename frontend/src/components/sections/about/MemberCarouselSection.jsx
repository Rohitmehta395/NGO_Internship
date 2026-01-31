// frontend/src/components/sections/about/MemberCarouselSection.jsx
import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VolunteerCard from "../../common/cards/VolunteerCard";

const MemberCarouselSection = ({ title, members, backgroundImage }) => {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll logic (Wait then move)
  useEffect(() => {
    const autoScroll = () => {
      if (isPaused || !scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      const maxScroll = container.scrollWidth - container.clientWidth;

      // If we are near the end, scroll back to start
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Otherwise scroll forward
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    };

    // "Wait for some seconds then move" - 3 seconds interval
    const intervalId = setInterval(autoScroll, 3000);

    return () => clearInterval(intervalId);
  }, [isPaused, members]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!members || members.length === 0) return null;

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Background Image */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100"></div>
      )}

      {/* Content */}
      <div className="relative z-10 py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 md:mb-20 text-[#0B0B45]">
            {title}
          </h1>

          <div
            className="relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left Button */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 bg-white p-3 rounded-full shadow-lg text-[#0B0B45] hover:bg-orange-50 hover:text-orange-600 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hidden md:block"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {members.map((member, index) => (
                <div key={index} className="snap-start flex-shrink-0">
                  <VolunteerCard
                    image={member.image}
                    name={member.name}
                    link={member.link}
                  />
                </div>
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 bg-white p-3 rounded-full shadow-lg text-[#0B0B45] hover:bg-orange-50 hover:text-orange-600 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hidden md:block"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCarouselSection;
