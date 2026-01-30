import React, { useEffect, useState } from "react";
import { educationImagesAPI } from "../../../services/api";
import { IMAGE_BASE_URL } from "../../../utils/constants";

const ImageCard = () => {
  const [stopScroll, setStopScroll] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await educationImagesAPI.getAll();
        if (res.data && Array.isArray(res.data.data)) {
          setImages(res.data.data);
        } else {
          console.error(
            "Invalid data format received from Education Images API",
          );
        }
      } catch (error) {
        console.error("Failed to load education images", error);
      }
    };
    fetchImages();
  }, []);

  const displayImages =
    images.length > 0
      ? images
      : [
          { image: "https://placehold.co/600x400?text=Upload+Images" },
          { image: "https://placehold.co/600x400?text=Via+Dashboard" },
        ];

  // CONSTANT SPEED LOGIC:
  // Calculate duration based on the number of images.
  // "3" represents the seconds allocated per image card width.
  // Increase this number to scroll slower, decrease to scroll faster.
  const speedPerImage = 3;
  const calculatedDuration = displayImages.length * speedPerImage;
  const animationDuration = `${Math.max(calculatedDuration, 10)}s`;

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
          will-change: transform;
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          /* Move by -33.33% because we have 3 sets of images. 
             This shifts exactly one full set, creating a seamless loop. */
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
              animationDuration: animationDuration,
            }}
          >
            {/* Repeat 3 times for smooth infinite scroll */}
            {[...displayImages, ...displayImages, ...displayImages].map(
              (item, index) => {
                const imgUrl = item?.image?.startsWith("http")
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
              },
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
