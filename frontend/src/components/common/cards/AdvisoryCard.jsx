export default function AdvisoryCard({ image, name, link }) {
  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Image Container */}
      <div className="p-4 pb-6">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>

      {/* Name Badge with Arrow */}
      <a
        href={link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-black text-white hover:bg-gray-800 transition-colors"
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <span className="text-base md:text-lg font-medium text-center flex-1">
            {name}
          </span>
          <svg
            className="w-5 h-5 flex-shrink-0 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </a>
    </div>
  );
}
