export function CardGlass({
  type = "image",
  image,
  videoId,
  title,
  description,
}) {
  return (
    <div className="w-full p-4">
      <div className="bg-white bg-opacity-30 border border-white border-opacity-40 shadow-lg rounded-3xl overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition duration-300">
        
        {/* Media Section */}
        <div className="md:w-1/3 w-full">
          {type === "video" ? (
            <iframe
              className="w-full h-full min-h-[220px] md:rounded-l-3xl"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover md:rounded-l-3xl"
            />
          )}
        </div>

        {/* Content Section */}
        <div className="md:w-2/3 w-full p-8 flex flex-col justify-center space-y-4 text-gray-700">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
}
