import React, { useRef, useEffect } from "react";
import "../../../styles/ScreenshotCaraousel.css";

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
    const scrollAmount = direction === "left" ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // ✅ Auto scroll effect
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let interval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 400, behavior: "smooth" });
      }
    }, 3000);

    // Pause on hover
    const pauseScroll = () => clearInterval(interval);
    const resumeScroll = () => {
      interval = setInterval(() => {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 400, behavior: "smooth" });
        }
      }, 3000);
    };

    container.addEventListener("mouseenter", pauseScroll);
    container.addEventListener("mouseleave", resumeScroll);

    return () => {
      clearInterval(interval);
      container.removeEventListener("mouseenter", pauseScroll);
      container.removeEventListener("mouseleave", resumeScroll);
    };
  }, []);

  return (
    <section className="screenshot-section">
      <h2 className="section-heading">Images</h2>
      <p className="section-sub">Snapshots of our real impact</p>

      <div className="carousel-container">
        {screenshots.length > 2 && (
          <button className="arrow left" onClick={() => scroll("left")}>
            &#8249;
          </button>
        )}

        <div
          className="screenshot-carousel"
          ref={carouselRef}
          style={{
            justifyContent: screenshots.length < 3 ? "center" : "flex-start",
          }}
        >
          {screenshots.map((img) => (
            <div className="screenshot-card" key={img.id}>
              <img src={img.src} alt={img.alt} className="screenshot-img" />
            </div>
          ))}
        </div>

        {screenshots.length > 2 && (
          <button className="arrow right" onClick={() => scroll("right")}>
            &#8250;
          </button>
        )}
      </div>
    </section>
  );
};

export default ScreenshotCarousel;
