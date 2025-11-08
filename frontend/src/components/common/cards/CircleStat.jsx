import React from "react";

export default function CircleStat({ icon, number, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-36 h-36 md:w-40 md:h-40 rounded-full border-2 border-white/60 flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* icon (pass an element) */}
          <div className="mb-2 text-white/90">{icon}</div>
          <div className="text-white font-bold text-xl">{number}</div>
          <div className="text-white/80 text-xs mt-1 text-center">{label}</div>
        </div>
      </div>
    </div>
  );
}
