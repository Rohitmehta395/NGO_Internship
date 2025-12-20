import React from "react";
import WhiteButton from "../buttons/WhiteButton";

export default function FlagshipCard({ image, title, desc }) {
  return (
    <article className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-6 w-full max-w-3xl">
      {/* Left: image */}
      <div className="flex-shrink-0 w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* text & Btn */}
      <div className="flex-1">
        <h3 className="text-[#E57C23] text-lg sm:text-xl font-semibold leading-snug">
          {title}
        </h3>
        <p className="text-[#0B0B45] mt-2 text-sm sm:text-base leading-relaxed mb-1">
          {desc}
        </p>
        <WhiteButton
          work="Explore More"
          path="/programs"
          className="border border-orange-700 hover:bg-orange-200 text-[#0B0B45]"
        />
      </div>
    </article>
  );
}
