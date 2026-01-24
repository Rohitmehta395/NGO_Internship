import React, { useEffect, useState, useRef } from "react";
import { Image, Upload, Trash2, GripVertical } from "lucide-react";
import { toast } from "react-toastify"; // <--- Import Toast
import { mediaAPI } from "../../../../services/api";
import { IMAGE_BASE_URL } from "../../../../utils/constants";

const emptyForm = {
  title: "",
  source: "",
  description: "",
  date: "",
  link: "",
  image: null,
  preview: null,
};

const MediaTestimonialAdmin = () => {
  const [mediaList, setMediaList] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("manual");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  /* ================= FETCH ================= */
  const fetchMedia = async () => {
    try {
      const res = await mediaAPI.getAll();
      setMediaList(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch media testimonials");
    }
  };

  useEffect(() => {
    fetchMedia();
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
    const _mediaList = [...mediaList];
    const draggedItemContent = _mediaList.splice(dragItem.current, 1)[0];
    _mediaList.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setMediaList(_mediaList);

    const itemsToUpdate = _mediaList.map((item, index) => ({
      _id: item._id,
      order: index,
    }));

    try {
      await mediaAPI.reorder(itemsToUpdate);
      toast.success("Order updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order");
      fetchMedia();
    }
  };

  /* ================= HANDLERS ================= */
  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error("File size exceeds 1MB. Please upload a smaller image.");
      e.target.value = "";
      return;
    }

    setForm((prev) => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, image: null, preview: null }));
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;

    let cleanPath = imagePath.replace(/^uploads\//, "");
    if (!cleanPath.startsWith("media/")) cleanPath = `media/${cleanPath}`;
    return `${IMAGE_BASE_URL}/uploads/${cleanPath}`;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      ["title", "source", "description", "date", "link"].forEach((key) => {
        formData.append(key, form[key]);
      });
      if (form.image) formData.append("image", form.image);

      if (editingId) {
        await mediaAPI.update(editingId, formData);
        toast.success("Updated successfully!");
      } else {
        if (!form.image) {
          toast.error("Image is required");
          setLoading(false);
          return;
        }
        await mediaAPI.create(formData);
        toast.success("Created successfully!");
      }

      resetForm();
      fetchMedia();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error saving testimonial");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (media) => {
    let previewUrl = media.image ? getImageUrl(media.image) : null;

    setForm({
      title: media.title || "",
      source: media.source || "",
      description: media.description || "",
      date: new Date(media.date).toISOString().slice(0, 10),
      link: media.link || "",
      image: null,
      preview: previewUrl,
    });

    setEditingId(media._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    try {
      await mediaAPI.delete(id);
      fetchMedia();
      toast.success("Deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting testimonial");
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  /* ================= SORTING ================= */
  const sortedMedia =
    sortOrder === "manual"
      ? mediaList
      : [...mediaList].sort((a, b) => {
          const dateA = new Date(a.date || a.createdAt || 0);
          const dateB = new Date(b.date || b.createdAt || 0);
          return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow border-t-4 border-orange-500">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "✏️ Edit Media Testimonial" : "➕ Add Media Testimonial"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={form.title}
            onChange={handleChange("title")}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Source"
            value={form.source}
            onChange={handleChange("source")}
            required
          />
          <textarea
            className="w-full border p-2 rounded h-24"
            placeholder="Description"
            value={form.description}
            onChange={handleChange("description")}
            required
          />
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={form.date}
            onChange={handleChange("date")}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Article link (optional)"
            value={form.link}
            onChange={handleChange("link")}
          />

          {!form.preview ? (
            <label className="border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <Upload className="text-gray-400 mb-2" size={32} />
              <span className="text-gray-600 font-medium">
                Click to Upload Image
              </span>
              {/* 👇 ADDED RECOMMENDED SIZE TEXT HERE */}
              <span className="text-xs text-gray-400 mt-1">
                Recommended Size: 800x600px (Max 1MB)
              </span>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <div className="relative inline-block mt-2">
              <img
                src={form.preview}
                alt="Preview"
                className="rounded-lg object-cover w-full max-w-sm h-48 border shadow-sm"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition font-medium shadow-sm"
            >
              {editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition font-medium"
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
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMedia.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No media testimonials found.
            </p>
          )}
          {sortedMedia.map((media, index) => (
            <div
              key={media._id}
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
              <div className="w-full h-40 overflow-hidden bg-gray-100">
                <img
                  src={
                    media.image
                      ? getImageUrl(media.image)
                      : "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={media.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-bold text-lg">{media.title}</h3>
                <p className="text-sm text-gray-500">{media.source}</p>
                <p className="text-sm text-gray-400">
                  {new Date(media.date).toLocaleDateString()}
                </p>
                {media.link && (
                  <a
                    href={media.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 text-sm underline"
                  >
                    Read Article
                  </a>
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(media)}
                    className="text-blue-600 bg-blue-50 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(media._id)}
                    className="text-red-600 bg-red-50 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaTestimonialAdmin;
