import { ArrowRight } from "lucide-react";
import DonationButton from "../../common/buttons/OrangeButton";

// Invisible SVG defining the clip path for the hero section
const SvgClipPath = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <clipPath id="hero-curve" clipPathUnits="objectBoundingBox">
        {/* S-curve shape */}
        <path d="M 0.1,0 L 1,0 L 1,1 L 0.1,1 C 0.2,0.75 0.2,0.25 0.1,0 Z" />
      </clipPath>
    </defs>
  </svg>
);

const HeroSection = () => {
  return (
    <>
      {/* SVG definition for clip-path */}
      <SvgClipPath />

      {/* Hero Container */}
      <div className="relative -mt-[80px] pt-[80px] flex flex-col lg:flex-row min-h-screen font-sans bg-[#0a2540] overflow-hidden">
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 text-white flex items-center justify-center p-8 lg:p-16 z-10">
          <div className="max-w-lg">
            <span className="text-orange-500 text-xl font-semibold tracking-wider flex items-center gap-2">
              {/* Heart Icon */}
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Empowering Lives Through Education
            </span>

            <h1 className="text-2xl lg:text-3xl font-bold my-6 leading-tight text-white">
              Education is the most powerful weapon you can use to change the
              world <span className="font-light italic">– Nelson Mandela</span>
            </h1>

            <DonationButton work="Donate Now" path="#donation" />
          </div>
        </div>

        {/* Right Side: Hero Image */}
        <div
          className="w-full lg:w-1/2 h-64 lg:h-full lg:absolute lg:top-0 lg:right-0"
          style={{ clipPath: "url(#hero-curve)" }}
        >
          <img
            src="/herosectionimage.jpg"
            alt="Children studying"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/800x600/cccccc/999999?text=Hero+Image";
              e.currentTarget.onerror = null;
            }}
          />
        </div>

        {/* Faded Hands Overlay */}
        <div className="absolute bottom-0 left-0 w-full lg:w-1/2 h-1/2 z-0">
          <img
            src="/hands.png"
            alt="Decorative hands overlay"
            className="w-full object-contain object-bottom opacity-10"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
