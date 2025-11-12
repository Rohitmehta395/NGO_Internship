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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Advisory Board Members
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-16 md:mb-20">
            (MargaDarshaks)
          </h2>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {members.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Image Container */}
                <div className="p-4 pb-6">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                </div>

                {/* Name Badge with Arrow */}
                <a
                  href={member.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  <div className="px-4 py-4 flex items-center justify-between">
                    <span className="text-base md:text-lg font-medium text-center flex-1">
                      {member.name}
                    </span>
                    <svg
                      className="w-5 h-5 flex-shrink-0 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
