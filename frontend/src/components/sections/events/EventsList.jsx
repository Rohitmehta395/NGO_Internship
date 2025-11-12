import { useState, useRef } from "react";
import EventCard from "./EventsCard";
import "../../../styles/EventList.css";

const EventsList = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;
  const eventsTopRef = useRef(null);

  const events = [
    {
      id: 1,
      image: "/5th sept.jpg",
      date: "5",
      month: "Sept 2025",
      title: "Certificates & Award ceremony",
      description:
        "On Teacher’s Day (5th Sept 2025), Govt Model Primary School – Sathanuru became a beacon of how Sulabh App 2.0 is transforming education. 🌟 The 2nd batch of 30 students (Grades 4–7) proudly received their Sulabh App 2.0 Certificates, while 9 bright Toppers were honoured with Certificates of Excellence & Special Prizes. 🎓✨ Since the launch of Sulabh App 2.0 on 15th June 2025, this single school has achieved remarkable milestones: ✅ 70 Students and 6 Teachers completed their courses ✅ 260 Certificates awarded in just 3 months.",
      venue: "GMPS - Sathanuru",
    },
    {
      id: 2,
      image: "/15_august.jpg",
      date: "15",
      month: "August 2025",
      title: "Certificates & Award ceremony",
      description:
        "On the occasion of India’s 79th Independence Day, 5 Toppers from the Grade 7 cohort studying at Govt Model Higher Primary School – Hulageri (Koppal District) were given Prizes and Merit Certificates. The rest 7 students, who completed the course using the Sulabh App 2.0, received Certificates of Completion.",
      venue: "GMHPS - Hulageri",
    },
    {
      id: 3,
      image: "/23rs_jult.jpg",
      date: "23",
      month: "July 2025",
      title: "Orientation & Demo session",
      description:
        "An Orientation & Demo session was conducted at St Teresa’s School attended by 12 Teachers. A Quiz program was organised using the Activity-Based Learning module of the Sulabh App 2.0. Teachers have been given access to 68 Activities. Post completion of all courses, an event is planned in end August to handover Certificates & Prizes to the Cohort Toppers.",
      venue: "St. Teresa's School",
    },
    {
      id: 4,
      image: "/10_july.jpg",
      date: "11",
      month: "July 2025",
      title: "Certificates & Award ceremony",
      description:
        "On the auspicious occasion of Guru Purnima, 3 toppers each from Grades 3 to 7, 5 Teachers and 28 other students were honoured with Certificates and Prizes.",
      venue: "GMPS - Sathanuru",
    },
    {
      id: 5,
      image: "/10th_june.jpg",
      date: "10",
      month: "June 2025",
      title: "Sulabh App 2.0 Launch",
      description:
        "Sharada Educational Trust launched Sulabh App 2.0 at Govt Model Primary School, Sathanuru on 14th June 2025 attended by 40 students from Classes 3–7. Click on image to watch a short video.",
      venue: "GMPS - Sathanuru",
    },
  ];

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Scroll to top when page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (eventsTopRef.current) {
      window.scrollTo({
        top: eventsTopRef.current.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };

  // Handle opening full event details
  const handleReadMore = (event) => {
    setSelectedEvent(event);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If user clicked on one event, show details instead of the list
  if (selectedEvent) {
    return (
      <div className="event-details">
        <img
          src={selectedEvent.image}
          alt={selectedEvent.title}
          className="event-details-img"
        />
        <h2>{selectedEvent.title}</h2>
        <p className="event-date">
          {selectedEvent.date} {selectedEvent.month}
        </p>
        <p className="event-venue">
          <strong>Venue:</strong> {selectedEvent.venue}
        </p>
        <p className="event-full-description">{selectedEvent.description}</p>

        <button
          className="event-btn"
          onClick={() => setSelectedEvent(null)}
          style={{
            backgroundColor: "#ED9121",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          ← Back to Events
        </button>
      </div>
    );
  }

  // Otherwise show event list
  return (
    <section className="events-list" ref={eventsTopRef}>
      <div className="events-container">
        {currentEvents.map((e) => (
          <EventCard key={e.id} {...e} onReadMore={() => handleReadMore(e)} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    </section>
  );
};

export default EventsList
;
