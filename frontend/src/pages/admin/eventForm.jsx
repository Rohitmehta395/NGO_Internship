import React, { useEffect, useState } from "react";
import {
  Image,
  Upload,
  X,
  Type,
  MapPin,
  Calendar,
  Trash2,
} from "lucide-react";
import { IMAGE_BASE_URL } from "../../utils/constants";

/* ================= DEFAULT STATE ================= */
const emptyForm = {
  title: "",
  description: "",
  venue: "",
  date: "",
  month: "",
  youtubeUrl: "",
  image: null,          // local file
  preview: null,        // image URL (server OR local)
};

const EventForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState(emptyForm);

  /* ================= LOAD / RESET ================= */
  useEffect(() => {
    if (!initialData) {
      setForm(emptyForm);
      return;
    }

    const previewUrl = initialData.imageUrl
      ? initialData.imageUrl.startsWith("http")
        ? initialData.imageUrl
        : `${IMAGE_BASE_URL}/uploads/${initialData.imageUrl}`
      : null;

    setForm({
      title: initialData.title || "",
      description: initialData.description || "",
      venue: initialData.venue || "",
      date: initialData.date || "",
      month: initialData.month || "",
      youtubeUrl: initialData.youtubeUrl || "",
      image: null,      // IMPORTANT: existing image ≠ file
      preview: previewUrl,
    });
  }, [initialData]);

  /* ================= HANDLERS ================= */
  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const removeImage = () => {
    setForm((prev) => ({
      ...prev,
      image: null,
      preview: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title: form.title,
      description: form.description,
      venue: form.venue,
      date: Number(form.date),
      month: form.month,
      youtubeUrl: form.youtubeUrl,
      image: form.image, // null if user didn’t change image
    });

    if (!initialData) {
      setForm(emptyForm);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    onCancel?.();
  };

  /* ================= UI ================= */
  return (
    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-orange-500">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">
          {initialData ? "✏️ Edit Event" : "📅 Create Event"}
        </h2>
        {onCancel && (
          <button type="button" onClick={handleCancel}>
            <X />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TITLE */}
        <div>
          <label className="font-semibold flex gap-2">
            <Type /> Event Title
          </label>
          <input
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={handleChange("title")}
            required
          />
        </div>

        {/* VENUE */}
        <div>
          <label className="font-semibold flex gap-2">
            <MapPin /> Venue
          </label>
          <input
            className="w-full border p-2 rounded"
            value={form.venue}
            onChange={handleChange("venue")}
            required
          />
        </div>

        {/* DATE + MONTH */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold flex gap-2">
              <Calendar /> Date
            </label>
            <input
              type="number"
              min="1"
              max="31"
              className="w-full border p-2 rounded"
              value={form.date}
              onChange={handleChange("date")}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Month & Year</label>
            <input
              className="w-full border p-2 rounded"
              placeholder="July 2025"
              value={form.month}
              onChange={handleChange("month")}
              required
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={form.description}
            onChange={handleChange("description")}
            required
          />
        </div>

        {/* IMAGE */}
        <div>
          <label className="font-semibold flex gap-2">
            <Image /> Cover Image
          </label>

          <label className="border-dashed border p-4 flex flex-col items-center cursor-pointer">
            <Upload />
            <span>Upload Image</span>
            <input type="file" hidden onChange={handleImageChange} />
          </label>

          {form.preview && (
            <div className="relative w-32 mt-3">
              <img
                src={form.preview}
                alt="Event preview"
                className="rounded object-cover w-32 h-32"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center"
              >
                <Trash2 />
              </button>
            </div>
          )}
        </div>

        {/* YOUTUBE */}
        <div>
          <label className="font-semibold">YouTube URL (optional)</label>
          <input
            className="w-full border p-2 rounded"
            value={form.youtubeUrl}
            onChange={handleChange("youtubeUrl")}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded"
          >
            {initialData ? "Update Event" : "Create Event"}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="border px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;


