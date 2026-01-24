import React from "react";

const ArticleCard = ({
  date,
  month,
  image,
  author,
  title,
  desc,
  onReadMore,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-[520px]">
      {/* Image Section with Date Badge */}
      <div className="relative h-56 shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-orange-500 text-white rounded-lg px-4 py-2 text-center shadow-sm">
          <div className="text-2xl font-bold">{date}</div>
          <div className="text-sm font-medium">{month}</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        {/* Author */}
        <div className="flex items-center gap-2 text-gray-600 mb-3 pb-3 border-b border-gray-100">
          <div className="w-5 h-5 text-orange-500">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <span className="text-sm font-medium">By {author}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
          {title}
        </h3>

        {/* Description (New) */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-4 flex-1">{desc}</p>

        {/* Read More Button */}
        <div className="mt-auto">
          <button
            onClick={onReadMore}
            className="flex items-center gap-2 text-orange-500 font-semibold hover:gap-4 transition-all duration-300 group cursor-pointer"
          >
            <span>Read More</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
