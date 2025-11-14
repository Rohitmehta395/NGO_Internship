export default function PatronCard({ image, name, link, isCircular = false }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      {/* Image Container */}
      <div className="bg-gray-100 p-4">
        <div className="aspect-square overflow-hidden rounded-full">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>

      {/* Name Badge */}
      <div className="px-6 py-4">
        <div className="bg-orange-400 rounded-full px-6 py-3 text-center">
          <h2 className="text-lg md:text-xl font-bold text-white">{name}</h2>
        </div>
      </div>

      {/* Know More Link */}
      <div className="px-6 pb-6">
        <a
          href={link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-xl md:text-2xl font-bold text-black hover:text-orange-400 transition-colors underline"
        >
          Know More
        </a>
      </div>
    </div>
  );
}
