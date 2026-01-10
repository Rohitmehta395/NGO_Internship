import { useEffect, useState } from "react";
import EventForm from "./eventForm";
import { eventsAPI } from "../../services/api";
import { IMAGE_BASE_URL } from "../../utils/constants";

const EventsAdmin = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH EVENTS ================= */
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await eventsAPI.getAll();
      setEvents(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async (data) => {
    const formData = new FormData();

    ["title", "description", "venue", "date", "month", "youtubeUrl"].forEach(
      (key) => {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }
    );

    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      if (editingEvent) {
        await eventsAPI.update(editingEvent._id, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Event updated");
      } else {
        if (!data.image) {
          alert("Image is required");
          return;
        }
        await eventsAPI.create(formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Event created");
      }

      setEditingEvent(null);
      fetchEvents();
    } catch (err) {
      console.error(err.response || err);
      alert("Event save failed");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await eventsAPI.delete(id);
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ================= IMAGE URL NORMALIZER ================= */
 const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;

  // If backend already gives relative path like "events/xxx.jpg"
  if (!imageUrl.startsWith("http")) {
    return `${IMAGE_BASE_URL}/uploads/${imageUrl}`;
  }

  // Fallback (in case full URL is stored someday)
  return imageUrl;
};
  /* ================= RENDER ================= */
  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      <EventForm
        onSubmit={handleSubmit}
        initialData={editingEvent}
        onCancel={() => setEditingEvent(null)}
      />

      <hr className="my-6" />

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const imageSrc = getImageUrl(event.imageUrl);

            return (
              <div
                key={event._id}
                className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
              >
                {/* IMAGE */}
                {imageSrc && (
                  <div className="w-full h-40 overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error("Image failed:", imageSrc);
                        e.target.src =
                          "https://placehold.co/600x400?text=No+Image";
                      }}
                    />
                  </div>
                )}

                {/* DETAILS */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {event.date} {event.month} · {event.venue}
                  </p>

                  {event.youtubeUrl && (
                    <a
                      href={event.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 text-sm underline"
                    >
                      Watch on YouTube
                    </a>
                  )}

                  {/* ACTIONS */}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="text-blue-600 bg-blue-50 px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="text-red-600 bg-red-50 px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventsAdmin;


