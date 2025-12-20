import AdvisoryCard from "../../common/cards/AdvisoryCard";

export default function AdvisoryBoard({ members, backgroundImage }) {
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#0B0B45]">
            Advisory Board Members
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-16 md:mb-20 text-[#0B0B45]">
            (MargaDarshaks)
          </h2>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {members.map((member, index) => (
              <AdvisoryCard
                key={index}
                image={member.image}
                name={member.name}
                link={member.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
