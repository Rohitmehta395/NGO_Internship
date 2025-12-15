import React from "react";

const ImageCard = () => {
  const [stopScroll, setStopScroll] = React.useState(false);

  const cardData = [
    {
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
          will-change: transform;
        }

        @keyframes marqueeScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% / 3));
          }
        }
      `}</style>

      {/* 🔒 overflow-x-hidden prevents right-side space */}
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
              animationDuration: "18s",
            }}
          >
            {[...cardData, ...cardData, ...cardData].map((card, index) => (
              <div
                key={index}
                className="w-56 h-80 rounded-2xl overflow-hidden shadow-lg bg-white p-1 flex-shrink-0"
              >
                <img
                  src={card.image}
                  alt=""
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
