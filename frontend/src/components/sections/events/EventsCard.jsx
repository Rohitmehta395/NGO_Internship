
import { IMAGE_BASE_URL } from "../../../utils/constants";

const EventCard = ({
  imageUrl,
  title,
  description,
  date,
  month,
  venue,
  youtubeUrl,
  onReadMore,
}) => {
  const openVideo = () => {
    if (!youtubeUrl) return;
    window.open(youtubeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.08)]
                    transition-transform duration-300 hover:-translate-y-1
                    w-full md:w-[45%] flex flex-col">

      <div
        className={`relative ${youtubeUrl ? "cursor-pointer" : ""}`}
        onClick={youtubeUrl ? openVideo : undefined}
      >
       <img
  src={
    imageUrl
      ? `${IMAGE_BASE_URL}/uploads/${imageUrl.startsWith("events/") ? imageUrl : `events/${imageUrl}`}`
      : "https://placehold.co/600x400?text=No+Image"
  }
  alt={title}
  className="w-full h-[250px] object-cover"
/>

        <div className="absolute top-4 left-4 bg-white text-[#ED9121]
                        rounded-lg px-3 py-1 font-semibold text-center">
          {date}
          <div className="text-xs">{month}</div>
        </div>

        {youtubeUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="bg-white text-[#ED9121] px-4 py-2 rounded-full font-bold">
              ▶ Watch Video
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{venue}</p>

        <p className="text-[15px] text-gray-600 mt-3 leading-relaxed">
          {description.slice(0, 130)}...
        </p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={onReadMore}
            className="bg-[#ED9121] text-white px-5 py-2 rounded-full font-semibold"
          >
            Read More
          </button>

          {youtubeUrl && (
            <button
              onClick={openVideo}
              className="border border-[#ED9121] text-[#ED9121] px-5 py-2 rounded-full font-semibold"
            >
              Watch Video
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

