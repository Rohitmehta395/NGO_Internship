import React from "react";
import DonationButton from "../../common/buttons/OrangeButton";

// Invisible SVG defining the clip path for the hero section
const SvgClipPath = () => (
  <svg width="0" height="0" className="absolute pointer-events-none">
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

      {/* Hero Container 
          - Mobile: justify-center (centers text vertically over image).
          - Desktop: justify-normal (resets to default for side-by-side).
      */}
      <div className="relative -mt-20 pt-20 flex flex-col justify-center lg:justify-normal lg:flex-row min-h-screen font-sans bg-[#0a2540] overflow-hidden">
        {/* Left Side: Text Content 
           - Added `relative z-10` so it sits ON TOP of the mobile background image.
           - Added `text-center lg:text-left` and `items-center lg:items-start` for mobile alignment.
        */}
        <div className="w-full lg:w-1/2 text-white flex flex-col items-center lg:items-start justify-center p-8 lg:p-16 z-10 relative">
          <div className="max-w-lg">
            <span className="text-orange-500 text-xl font-semibold tracking-wider flex items-center justify-center lg:justify-start gap-2">
              {/* Heart Icon */}
              <span className="text-[#E57C23] text-2xl">♡</span>
              Empowering Lives Through Education
            </span>

            <h1 className="text-2xl md:text-4xl lg:text-3xl font-bold my-6 leading-tight text-white text-center lg:text-left">
              Education is the most powerful weapon you can use to change the
              world <span className="font-light italic">– Nelson Mandela</span>
            </h1>

            <div className="flex justify-center lg:justify-start w-full">
              <DonationButton work="Donate Now" path="#donation" />
            </div>
          </div>
        </div>

        {/* Right Side: Hero Image 
           - Mobile: `absolute inset-0 z-0` (Full screen background).
           - Desktop: `lg:w-1/2 lg:right-0` (Restores original side layout).
           - Clip Path: Applied via class `lg:[clip-path:url(#hero-curve)]` ONLY on desktop.
        */}
        <div className="absolute inset-0 w-full h-full lg:w-1/2 lg:h-full lg:absolute lg:top-0 lg:right-0 lg:left-auto z-0">
          {/* Wrapper to handle clip-path and overlay */}
          <div className="relative w-full h-full lg:[clip-path:url(#hero-curve)]">
            {/* Dark Overlay: Visible ONLY on Mobile to make text readable */}
            <div className="absolute inset-0 bg-black/60 lg:hidden z-10"></div>

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
        </div>

        {/* Faded Hands Overlay 
           - Hidden on mobile (`hidden lg:block`) to keep the background image clean.
        */}
        <div className="hidden lg:block absolute bottom-0 left-0 w-full lg:w-1/2 h-1/2 z-0">
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
