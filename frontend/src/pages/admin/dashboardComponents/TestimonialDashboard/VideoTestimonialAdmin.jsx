import React, { useEffect, useState, useRef } from "react";
import { videoTestimonialsAPI } from "../../../../services/api";
import { GripVertical } from "lucide-react";
import { toast } from "react-toastify"; // <--- Import Toast

const initialForm = {
  name: "",
  title: "",
  description: "",
  ytLink: "",
  date: "",
};

const VideoTestimonialAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("manual");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  /* ================= FETCH ================= */
  const fetchVideos = async () => {
    try {
      const res = await videoTestimonialsAPI.getAll();
      setVideos(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch videos");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  /* ================= DRAG & DROP ================= */
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
    const _videos = [...videos];
    const draggedItemContent = _videos.splice(dragItem.current, 1)[0];
    _videos.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setVideos(_videos);

    const itemsToUpdate = _videos.map((item, index) => ({
      _id: item._id,
      order: index,
    }));

    try {
      await videoTestimonialsAPI.reorder(itemsToUpdate);
      toast.success("Order updated!");
    } catch (err) {
      toast.error("Failed to reorder");
      fetchVideos();
    }
  };

  /* ================= HELPERS ================= */
 const getThumbnail = (url) => {
   if (!url) return null;
   const regExp =
     /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
   const match = url.match(regExp);

   return match && match[2].length === 11
     ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`
     : null;
 };

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await videoTestimonialsAPI.update(editingId, form);
        toast.success("Updated successfully!");
      } else {
        await videoTestimonialsAPI.create(form);
        toast.success("Created successfully!");
      }
      resetForm();
      fetchVideos();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error saving video");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (video) => {
    setForm({
      name: video.name || "",
      title: video.title || "",
      description: video.description || "",
      ytLink: video.ytLink || "",
      date: video.date ? new Date(video.date).toISOString().slice(0, 10) : "",
    });
    setEditingId(video._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video testimonial?")) return;
    try {
      await videoTestimonialsAPI.delete(id);
      fetchVideos();
      toast.success("Deleted successfully!");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  /* ================= SORTING ================= */
  const sortedVideos =
    sortOrder === "manual"
      ? videos
      : [...videos].sort((a, b) => {
          const dateA = new Date(a.date || a.createdAt || 0);
          const dateB = new Date(b.date || b.createdAt || 0);
          return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border-t-4 border-orange-500">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "✏️ Edit Video Testimonial" : "🎬 Add Video Testimonial"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Person Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              name="title"
              placeholder="Title / Designation"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              name="ytLink"
              placeholder="YouTube Link"
              value={form.ytLink}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {form.ytLink && getThumbnail(form.ytLink) && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Thumbnail Preview:</p>
              <img
                src={getThumbnail(form.ytLink)}
                alt="Thumbnail"
                className="h-24 rounded shadow-sm"
              />
            </div>
          )}

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
            >
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border px-5 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <div className="flex justify-end mb-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <option value="manual">Manual Order (Drag & Drop)</option>
            <option value="newest">Newest Date First</option>
            <option value="oldest">Oldest Date First</option>
          </select>
        </div>

        <div className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVideos.length > 0 ? (
            sortedVideos.map((video, index) => {
              const thumbnail = getThumbnail(video.ytLink);
              return (
                <div
                  key={video._id}
                  draggable={sortOrder === "manual"}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className={`bg-white rounded-lg shadow border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition relative ${sortOrder === "manual" ? "cursor-move" : ""}`}
                >
                  {sortOrder === "manual" && (
                    <div className="absolute top-2 right-2 z-10 bg-black/30 p-1 rounded text-white">
                      <GripVertical size={16} />
                    </div>
                  )}
                  <div className="relative w-full h-48 bg-black">
                    {thumbnail ? (
                      <div className="w-full h-full relative">
                        <img
                          src={thumbnail}
                          alt={video.name}
                          className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center text-red-600 text-xl font-bold">
                            ▶
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Invalid Link
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg leading-tight">
                          {video.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                          {video.title}
                        </p>
                      </div>
                      {video.date && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {new Date(video.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-3 mb-4 flex-1">
                      {video.description}
                    </p>
                    <div className="flex gap-2 mt-auto pt-3 border-t border-gray-50">
                      <button
                        onClick={() => handleEdit(video)}
                        className="flex-1 text-blue-600 bg-blue-50 px-3 py-2 rounded text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="flex-1 text-red-600 bg-red-50 px-3 py-2 rounded text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              No video testimonials found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonialAdmin;
