import React, { useEffect, useState } from "react";
import { educationImagesAPI } from "../../../services/api"; // Adjust path
import { IMAGE_BASE_URL } from "../../../utils/constants";

const ImageCard = () => {
  const [stopScroll, setStopScroll] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await educationImagesAPI.getAll();
        setImages(res.data.data);
      } catch (error) {
        console.error("Failed to load education images");
      }
    };
    fetchImages();
  }, []);

  // Use placeholder if no images uploaded yet
  const displayImages =
    images.length > 0
      ? images
      : [
          { image: "https://placehold.co/600x400?text=Upload+Images" },
          { image: "https://placehold.co/600x400?text=Via+Dashboard" },
        ];

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
          will-change: transform;
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>

      <div className="relative w-full overflow-x-hidden">
        <div
          className="overflow-hidden w-full relative mb-10"
          onMouseEnter={() => setStopScroll(true)}
          onMouseLeave={() => setStopScroll(false)}
        >
          <div
            className="marquee-inner flex gap-6 w-max"
            style={{
              animationPlayState: stopScroll ? "paused" : "running",
              animationDuration: "25s", // Slower for better view
            }}
          >
            {/* Repeat 3 times for smooth infinite scroll */}
            {[...displayImages, ...displayImages, ...displayImages].map(
              (item, index) => {
                const imgUrl = item.image.startsWith("http")
                  ? item.image
                  : `${IMAGE_BASE_URL}/${item.image}`;

                return (
                  <div
                    key={index}
                    className="w-56 h-80 rounded-2xl overflow-hidden shadow-lg bg-white p-1 flex-shrink-0"
                  >
                    <img
                      src={imgUrl}
                      alt="Education"
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/600x400?text=Error";
                      }}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
