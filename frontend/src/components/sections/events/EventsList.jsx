import { useState, useRef } from "react";
import EventCard from "./EventsCard";

const EventsList = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsTopRef = useRef(null);

  const eventsPerPage = 4;

  const events = [
    {
      id: 1,
      image: "/5th sept.jpg",
      date: "5",
      month: "Sept 2025",
      title: "Certificates & Award ceremony",
      description:
        "On Teacher’s Day (5th Sept 2025), Govt Model Primary School – Sathanuru became a beacon...",
      venue: "GMPS - Sathanuru",
    },
    {
      id: 2,
      image: "/15_august.jpg",
      date: "15",
      month: "August 2025",
      title: "Certificates & Award ceremony",
      description:
        "On the occasion of India’s 79th Independence Day...",
      venue: "GMHPS - Hulageri",
    },
    {
      id: 3,
      image: "/23rs_jult.jpg",
      date: "23",
      month: "July 2025",
      title: "Orientation & Demo session",
      description:
        "An Orientation & Demo session was conducted at St Teresa’s School...",
      venue: "St. Teresa's School",
    },
    {
      id: 4,
      image: "/10_july.jpg",
      date: "11",
      month: "July 2025",
      title: "Certificates & Award ceremony",
      description:
        "On the auspicious occasion of Guru Purnima...",
      venue: "GMPS - Sathanuru",
    },
    {
      id: 5,
      image: "/10th_june.jpg",
      date: "10",
      month: "June 2025",
      title: "Sulabh App 2.0 Launch",
      description:
        "Sharada Educational Trust launched Sulabh App 2.0...",
      venue: "GMPS - Sathanuru",
    },
  ];

  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = events.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    eventsTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ===== EVENT DETAILS VIEW ===== */
  if (selectedEvent) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-10">
        <img
          src={selectedEvent.image}
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

        <button
          onClick={() => setSelectedEvent(null)}
          className="mt-6 bg-[#ED9121] text-white
                     px-6 py-2 rounded-md font-semibold"
        >
          ← Back to Events
        </button>
      </div>
    );
  }

  /* ===== EVENT LIST VIEW ===== */
  return (
    <section
      ref={eventsTopRef}
      className="bg-[#f9f9f9] px-5 md:px-20 py-16"
    >
      <div className="flex flex-wrap justify-between gap-8">
        {currentEvents.map((event) => (
          <EventCard
            key={event.id}
            {...event}
            onReadMore={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      {/* Pagination */}
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
    </section>
  );
};

export default EventsList;
