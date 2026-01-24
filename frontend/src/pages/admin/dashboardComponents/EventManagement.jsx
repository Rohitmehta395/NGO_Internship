import { useEffect, useState, useRef } from "react";
import EventForm from "./eventForm.jsx";
import { eventsAPI } from "../../../services/api.js";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";
import { GripVertical } from "lucide-react";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("manual");

  // Drag Refs
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await eventsAPI.getAll({ limit: 1000 });
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

  /* --- DRAG HANDLERS --- */
  const handleDragStart = (e, index) => {
    if (sortOrder !== "manual") return;
    dragItem.current = index;
  };

  const handleDragEnter = (e, index) => {
    if (sortOrder !== "manual") return;
    dragOverItem.current = index;
  };

  const handleDragEnd = async () => {
    if (sortOrder !== "manual") return;
    const _events = [...events];
    const draggedItemContent = _events.splice(dragItem.current, 1)[0];
    _events.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setEvents(_events);

    const itemsToUpdate = _events.map((item, index) => ({
      _id: item._id,
      order: index,
    }));

    try {
      await eventsAPI.reorder(itemsToUpdate);
    } catch (err) {
      console.error("Reorder failed");
      fetchEvents();
    }
  };

  const handleSubmit = async (data) => {
    const formData = new FormData();
    ["title", "description", "venue", "date", "month", "youtubeUrl"].forEach(
      (key) => {
        if (data[key] !== undefined && data[key] !== null)
          formData.append(key, data[key]);
      },
    );
    if (data.image) formData.append("image", data.image);

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
      console.error(err);
      alert("Event save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await eventsAPI.delete(id);
      fetchEvents();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    let cleanPath = imagePath.replace(/^uploads\//, "");
    if (cleanPath.startsWith("/")) cleanPath = cleanPath.slice(1);
    if (!cleanPath.startsWith("events/")) cleanPath = `events/${cleanPath}`;
    return `${IMAGE_BASE_URL}/uploads/${cleanPath}`;
  };

  const sortedEvents =
    sortOrder === "manual"
      ? events
      : [...events].sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      <EventForm
        onSubmit={handleSubmit}
        initialData={editingEvent}
        onCancel={() => setEditingEvent(null)}
      />
      <hr className="my-6" />
      <div className="flex justify-end">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="manual">Manual Order (Drag & Drop)</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : sortedEvents.length === 0 ? (
        <p className="text-center text-gray-500">No events created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event, index) => {
            const imageSrc = getImageUrl(event.image || event.imageUrl);
            return (
              <div
                key={event._id}
                draggable={sortOrder === "manual"}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition relative ${sortOrder === "manual" ? "cursor-move" : ""}`}
              >
                {sortOrder === "manual" && (
                  <div className="absolute top-2 right-2 z-10 bg-black/30 p-1 rounded text-white">
                    <GripVertical size={16} />
                  </div>
                )}
                {/* IMAGE */}
                <div className="w-full h-40 overflow-hidden bg-gray-100">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/600x400?text=Image+Not+Found";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
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

export default EventManagement;
