import React, { useRef, useEffect } from "react";

const ScreenshotCarousel = () => {
  const carouselRef = useRef(null);

  const screenshots = [
    { id: 1, src: "/image1.jpg", alt: "Bhagya Ran" },
    { id: 2, src: "/pvmaiya.jpg", alt: "pv maiya" },
    { id: 3, src: "/AshokKamanth.jpg", alt: "Ashok Kamanth" },
    { id: 4, src: "/email.jpg", alt: "Screenshot 4" },
    { id: 5, src: "/MalaKumar.jpg", alt: "Mala Kumar" },
    { id: 6, src: "/certi.jpg", alt: "Certificate" },
  ];

  const scroll = (direction) => {
    const container = carouselRef.current;
    container.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let interval = setInterval(() => {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 400, behavior: "smooth" });
      }
    }, 3000);

    const pause = () => clearInterval(interval);
    const resume = () => {
      interval = setInterval(() => {
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 400, behavior: "smooth" });
        }
      }, 3000);
    };

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);

    return () => {
      clearInterval(interval);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section
      className="
        text-center bg-white font-[Poppins]
        px-5 py-10
        md:px-10 md:py-12
        lg:px-[100px] lg:py-[70px]
      "
    >
      {/* Heading */}
      <h2
        className="
          font-[Quicksand] text-[#ED9121]
          text-[2rem] md:text-[2.5rem]
          mb-2
        "
      >
        Images
      </h2>

      <p className="text-[#555] text-[1rem] md:text-[1.1rem] mb-10">
        Snapshots of our real impact
      </p>

      {/* Carousel wrapper */}
      <div className="relative flex items-center justify-center">
        {screenshots.length > 2 && (
          <button
            onClick={() => scroll("left")}
            className="
              absolute left-[-25px] top-[45%] -translate-y-1/2
              w-[45px] h-[45px] rounded-full
              bg-[#ED9121] text-white text-[2rem]
              flex items-center justify-center
              z-10 transition-colors
              hover:bg-[#c86d00]
            "
          >
            &#8249;
          </button>
        )}

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="
            flex gap-8 overflow-x-auto scroll-smooth
            py-4
            scrollbar-none
          "
          style={{
            justifyContent:
              screenshots.length < 3 ? "center" : "flex-start",
          }}
        >
          {screenshots.map((img) => (
            <div
              key={img.id}
              className="
                flex-shrink-0
                w-[240px] md:w-[280px] lg:w-[320px]
                bg-[#fefefe]
                rounded-[12px]
                shadow-[0_4px_15px_rgba(0,0,0,0.08)]
                p-[10px]
                flex items-center justify-center
                transition-all duration-300
                hover:-translate-y-[6px]
                hover:shadow-[0_6px_25px_rgba(237,145,33,0.3)]
              "
            >
              <img
                src={img.src}
                alt={img.alt}
                className="
                  w-full max-h-[300px] md:max-h-[420px]
                  object-contain
                  bg-white
                  rounded-[8px]
                  border-b-[3px] border-[#ED9121]
                "
              />
            </div>
          ))}
        </div>

        {screenshots.length > 2 && (
          <button
            onClick={() => scroll("right")}
            className="
              absolute right-[-25px] top-[45%] -translate-y-1/2
              w-[45px] h-[45px] rounded-full
              bg-[#ED9121] text-white text-[2rem]
              flex items-center justify-center
              z-10 transition-colors
              hover:bg-[#c86d00]
            "
          >
            &#8250;
          </button>
        )}
      </div>
    </section>
  );
};

export default ScreenshotCarousel;

