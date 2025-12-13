import React from "react";
import arvindImage from "../../../assets/AboutUsPics/ArvindKamath.webp";

const Arvind = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center py-4 px-2">
      <div className="w-full max-w-7xl bg-white/80 mt-10">
        {/* Image Section - Fits in viewport */}
        <div className="relative w-full mt-5">
          <img
            src={arvindImage}
            alt="Arvind Kamath - Living My Promise"
            className="w-full h-auto object-contain max-h-[70vh] mx-auto"
          />
        </div>

        {/* Quote Section */}
        <div className="p-6 md:p-12 text-center bg-white/80 backdrop-blur-sm rounded-b-2xl shadow-xl">
          <div className="space-y-4 max-w-4xl mx-auto">
            <p className="text-lg md:text-2xl lg:text-3xl font-light text-orange-600 leading-relaxed">
              I am proud to be associated as a "Promisor" on the{" "}
              <span className="font-semibold">#LivingMyPromise</span> platform.
            </p>
            <p className="text-lg md:text-2xl lg:text-3xl font-light text-orange-600 leading-relaxed">
              Hope to be the "Change" I wish to see in the world.
            </p>
            <div className="pt-6 border-t-2 border-gray-200 mt-6">
              <p className="text-xl md:text-3xl lg:text-4xl font-serif italic text-gray-800">
                — Arvind Kamath
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arvind;
