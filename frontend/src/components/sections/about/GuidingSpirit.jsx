import AnuradhaKamath from "../../../assets/AnuradhaKamath.webp";
import MulkiAnnuKamath from "../../../assets/MulkiAnnuKamath.webp";

export default function GuidingSpirit({ leftImage, rightImage }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 overflow-hidden">
      {/* Decorative orange shapes */}
      <div className="absolute top-0 right-0 w-2/3 h-full">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 0 L 100 0 L 100 100 L 0 100 Q 30 50 0 0"
            fill="#FF8904"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-1/2 h-1/3">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path d="M 0 100 L 100 100 L 100 0 Q 50 70 0 100" fill="#FF8904" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 py-12 md:py-16 lg:py-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12 md:mb-16">
          <div className="bg-white rounded-full px-12 py-6 inline-block shadow-lg">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 text-center">
              Our Guiding Spirit
            </h1>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Card */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-4 shadow-2xl">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={AnuradhaKamath}
                  alt="Smt Anuradha Kamath"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="bg-white rounded-full px-8 py-4 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                Smt Anuradha Kamath
              </h2>
            </div>
          </div>

          {/* Right Card */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-4 shadow-2xl">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={MulkiAnnuKamath}
                  alt="Shri Mulki Annu Kamath"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="bg-white rounded-full px-8 py-4 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                Shri Mulki Annu Kamath
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
