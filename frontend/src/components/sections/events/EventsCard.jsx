const EventCard = ({
  image,
  title,
  description,
  date,
  month,
  venue,
  onReadMore,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.08)] 
                    transition-transform duration-300 hover:-translate-y-1
                    w-full md:w-[45%] flex flex-col">

      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[250px] object-cover"
        />

        {/* Date badge */}
        <div className="absolute top-4 left-4 bg-white text-[#ED9121]
                        rounded-lg px-3 py-1 font-semibold text-center">
          {date}
          <div className="text-xs">{month}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-black">{title}</h3>

        <p className="text-sm text-gray-600 mt-1">{venue}</p>

        <p className="text-[15px] text-gray-600 mt-3 leading-relaxed">
          {description.slice(0, 130)}...
        </p>

        <button
          onClick={onReadMore}
          className="mt-4 inline-block bg-[#ED9121] text-white
                     px-6 py-2 rounded-full font-semibold
                     hover:opacity-90 transition"
        >
          Read More →
        </button>
      </div>
    </div>
  );
};

export default EventCard;

