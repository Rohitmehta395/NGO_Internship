import VolunteerCard from "../../common/cards/VolunteerCard";

export default function Volunteers({ volunteers, backgroundImage }) {
  // Duplicate volunteers array for seamless loop
  const duplicatedVolunteers = [...volunteers, ...volunteers];

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
          {/* Header */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 md:mb-20 text-[#0B0B45]">
            Volunteers & Interns - Our Strength
          </h1>

          {/* Scrolling Container */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex gap-6 animate-scroll"
                style={{
                  width: `${duplicatedVolunteers.length * 336}px`, // 320px card + 16px gap
                }}
              >
                {duplicatedVolunteers.map((volunteer, index) => (
                  <VolunteerCard
                    key={index}
                    image={volunteer.image}
                    name={volunteer.name}
                    link={volunteer.link}
                  />
                ))}
              </div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${volunteers.length * 336}px);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        /* FIX: This pauses the animation in place instead of resetting it */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
