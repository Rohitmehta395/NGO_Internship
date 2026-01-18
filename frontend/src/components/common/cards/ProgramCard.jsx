import React from "react";
import { FaPlay, FaExternalLinkAlt } from "react-icons/fa";

export function ProgramCard({
  index,
  type = "image",
  image,
  videoId,
  videoUrl, // New prop
  title,
  description,
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="group relative w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div
        className={`flex flex-col lg:flex-row ${!isEven ? "lg:flex-row-reverse" : ""} items-center`}
      >
        {/* --- MEDIA SIDE --- */}
        <div
          className={`relative w-full lg:w-1/2 h-64 lg:h-[450px] shrink-0 overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-100 ${type === "image" ? "bg-gray-50 p-6" : "bg-black"}`}
        >
          {type === "video" ? (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full relative group/video cursor-pointer"
            >
              {/* YouTube Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={title}
                className="w-full h-full object-cover opacity-80 group-hover/video:opacity-60 transition-opacity duration-300"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform duration-300">
                  <FaPlay className="text-red-600 ml-1 text-2xl" />
                </div>
              </div>

              {/* External Link Hint */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1 opacity-0 group-hover/video:opacity-100 transition-opacity">
                Open in YouTube <FaExternalLinkAlt size={10} />
              </div>
            </a>
          ) : (
            // Uploaded Image Logic (Your requested styling)
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-102"
            />
          )}
        </div>

        {/* --- CONTENT SIDE --- */}
        <div className="flex flex-col justify-center p-6 lg:p-12 lg:w-1/2">
          <div className="mb-4">
            <div className="h-1 w-10 bg-orange-500 rounded-full mb-3"></div>

            <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight font-sans">
              {title}
            </h3>
          </div>

          <div className="prose prose-orange max-w-none">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
