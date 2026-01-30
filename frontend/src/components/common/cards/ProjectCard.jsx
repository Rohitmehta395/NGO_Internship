import React from "react";

export default function ProjectCard({
  icon: Icon,
  title,
  description,
  videoUrl,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 p-8 text-center flex flex-col items-center min-h-[380px]">
      {videoUrl ? (
        <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
          <iframe src={videoUrl} className="w-full h-full" allowFullScreen />
        </div>
      ) : (
        <div className="bg-[#0a2540] text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md">
          {Icon && <Icon className="w-8 h-8" />}
        </div>
      )}

      <h3 className="font-bold text-lg mb-3 tracking-wide text-gray-900 uppercase">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed italic">
        {description}
      </p>
      <a
        href="#"
        className="text-blue-600 text-sm font-semibold tracking-wide hover:text-blue-800 transition"
      >
        MORE
      </a>
    </div>
  );
}
