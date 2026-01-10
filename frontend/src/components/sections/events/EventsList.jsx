import { useEffect, useState, useRef } from "react";
import { IMAGE_BASE_URL } from "../../../utils/constants";
import { eventsAPI } from "../../../services/api.js";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const eventsTopRef = useRef(null);

  /* ================= FETCH EVENTS LIST ================= */
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await eventsAPI.getAll({
          page: currentPage,
          limit: 4,
        });
        const { data, pagination } = response.data;

        setEvents(data || []);
        setTotalPages(pagination?.totalPages || 1);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage]);

  /* ================= FETCH SINGLE EVENT ================= */
  useEffect(() => {
    if (!selectedEventId) return;

    const fetchSingleEvent = async () => {
      try {
        const response = await eventsAPI.getById(selectedEventId);
        setSelectedEvent(response.data.data || response.data);
      } catch (err) {
        console.error("Error fetching event details:", err);
      }
    };

    fetchSingleEvent();
  }, [selectedEventId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    eventsTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading && events.length === 0) {
    return <div className="text-center py-20">Loading events...</div>;
  }

  /* ================= EVENT DETAILS VIEW ================= */
  if (selectedEvent) {
    const fullImageUrl = selectedEvent.imageUrl
      ? `${IMAGE_BASE_URL}/uploads/${
          selectedEvent.imageUrl.startsWith("events/")
            ? selectedEvent.imageUrl
            : `events/${selectedEvent.imageUrl}`
        }`
      : "https://placehold.co/600x400?text=No+Image";

    return (
      <div className="max-w-4xl mx-auto px-5 py-10">
        <img
          src={fullImageUrl}
          alt={selectedEvent.title}
          className="w-full rounded-xl mb-6"
        />
        <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
        <p className="text-gray-500 mt-1">
          {selectedEvent.date} {selectedEvent.month}
        </p>
        <p className="mt-2">
          <strong>Venue:</strong> {selectedEvent.venue}
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          {selectedEvent.description}
        </p>

        {selectedEvent.youtubeUrl && (
          <a
            href={selectedEvent.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-[#ED9121] text-white px-6 py-2 rounded-md font-semibold"
          >
            ▶ Watch Video
          </a>
        )}

        <button
          onClick={() => {
            setSelectedEvent(null);
            setSelectedEventId(null);
          }}
          className="block mt-6 border border-[#ED9121] text-[#ED9121] px-6 py-2 rounded-md font-semibold"
        >
          ← Back to Events
        </button>
      </div>
    );
  }

  /* ================= EVENT LIST VIEW ================= */
  return (
    <section ref={eventsTopRef} className="bg-[#f9f9f9] px-5 md:px-20 py-16">
      <div className="flex flex-wrap justify-between gap-8">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              {...event}
              onReadMore={() => setSelectedEventId(event._id)}
            />
          ))
        ) : (
          <p className="text-center w-full text-gray-500">No events found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-9 h-9 rounded-full border font-semibold disabled:opacity-40"
          >
            ←
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`w-9 h-9 rounded-full border font-semibold
                ${
                  currentPage === i + 1
                    ? "bg-[#ED9121] text-white border-[#ED9121]"
                    : "bg-white"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-9 h-9 rounded-full border font-semibold disabled:opacity-40"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
};

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

  const fullImageUrl = imageUrl
    ? `${IMAGE_BASE_URL}/uploads/${
        imageUrl.startsWith("events/") ? imageUrl : `events/${imageUrl}`
      }`
    : "https://placehold.co/600x400?text=No+Image";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 w-full md:w-[45%] flex flex-col">
      <div
        className={`relative ${youtubeUrl ? "cursor-pointer" : ""}`}
        onClick={youtubeUrl ? openVideo : undefined}
      >
        <img
          src={fullImageUrl}
          alt={title}
          className="w-full h-[250px] object-cover"
        />
        <div className="absolute top-4 left-4 bg-white text-[#ED9121] rounded-lg px-3 py-1 font-semibold text-center">
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
          {description?.slice(0, 130)}...
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

export default EventsList;
