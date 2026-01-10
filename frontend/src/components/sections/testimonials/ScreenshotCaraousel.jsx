import React, { useRef, useEffect } from "react";

const ScreenshotCarousel = () => {
  const carouselRef = useRef(null);

  const screenshots = [
    { id: 1, src: "/image1.jpg", alt: "Bhagya Ran" },
    { id: 2, src: "/pvmaiya.jpg", alt: "PV Maiya" },
    { id: 3, src: "/email.jpg", alt: "Email Screenshot" },
  ];

  const scroll = (dir) => {
    carouselRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (screenshots.length < 3) return;

    const id = setInterval(() => scroll("right"), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-white px-4 py-12 overflow-x-hidden font-[Poppins]">
      <h2 className="font-[Quicksand] text-[#ED9121] text-2xl md:text-4xl text-center mb-2">
        Images
      </h2>

      <p className="text-gray-600 text-center mb-8">
        Snapshots of our real impact
      </p>

      <div className="relative max-w-6xl mx-auto">
        {/* Left */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2
                     bg-[#ED9121] text-white w-9 h-9 rounded-full
                     flex items-center justify-center md:left-[-20px]"
        >
          &#8249;
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto scroll-smooth
                     max-w-full px-2 scrollbar-hide"
        >
          {screenshots.map((img) => (
            <div
              key={img.id}
              className="flex-shrink-0 w-60 md:w-72 bg-white rounded-xl
                         shadow-md p-3 transition hover:-translate-y-1"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-72 object-contain rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Right */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2
                     bg-[#ED9121] text-white w-9 h-9 rounded-full
                     flex items-center justify-center md:right-[-20px]"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default ScreenshotCarousel;

