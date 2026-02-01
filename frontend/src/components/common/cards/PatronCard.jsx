import React from "react";

export default function PatronCard({ image, name, link }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full border border-gray-100">
      {/* Image Container with Padding */}
      <div className="p-4">
        <div className="w-full aspect-[3/4] overflow-hidden rounded-xl relative group">
          {/* Image: Grayscale + Scale Effect */}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          />

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
        </div>
      </div>

      {/* Name Badge */}
      <div className="px-4 pb-4 flex-grow flex items-center justify-center bg-white">
        <div className="bg-orange-500 rounded-full px-6 py-2 w-full text-center shadow-sm">
          <h2 className="text-lg font-bold text-white tracking-wide">{name}</h2>
        </div>
      </div>
    </div>
  );
}
