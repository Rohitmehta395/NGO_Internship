import React, { useEffect, useState } from "react";
import { videoTestimonialsAPI } from "../../../../services/api"; 

const initialForm = {
  name: "",
  title: "",
  description: "",
  ytLink: "",
};

const VideoTestimonialAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchVideos = async () => {
    try {
      const res = await videoTestimonialsAPI.getAll();
      setVideos(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch videos");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

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
        alert("Updated successfully!");
      } else {
        await videoTestimonialsAPI.create(form);
        alert("Created successfully!");
      }
      resetForm();
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Error saving video");
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
    });
    setEditingId(video._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video testimonial?")) return;
    try {
      await videoTestimonialsAPI.delete(id);
      fetchVideos();
      alert("Deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* FORM */}
      <div className="bg-white p-6 rounded-lg shadow border-t-4 border-orange-500">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "✏️ Edit Video Testimonial" : "🎬 Add Video Testimonial"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <textarea
            name="description"
            placeholder="Testimonial Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="ytLink"
            placeholder="YouTube Embed Link"
            value={form.ytLink}
            onChange={handleChange}
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

      {/* LIST */}
      <div className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="font-bold text-lg">{video.name}</h3>
                <p className="text-sm text-gray-500">{video.title}</p>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {video.description}
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => handleEdit(video)}
                  className="text-blue-600 bg-blue-50 px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="text-red-600 bg-red-50 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No video testimonials found.
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoTestimonialAdmin;

