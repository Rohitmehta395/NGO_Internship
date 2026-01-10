import React, { useEffect, useState } from "react";
import { Image, Upload, X, Type, MapPin, Calendar, Trash2 } from "lucide-react";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";

const emptyForm = {
  title: "",
  description: "",
  venue: "",
  date: "",
  month: "",
  youtubeUrl: "",
  image: null,
  preview: null,
};

const EventForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!initialData) {
      setForm(emptyForm);
      return;
    }

    // Handle Image Preview for Editing
    let previewUrl = null;
    // Use imageUrl from Schema
    const dbPath = initialData.imageUrl;

    if (dbPath) {
      if (dbPath.startsWith("http")) {
        previewUrl = dbPath;
      } else {
        // Build the URL exactly like we do in the listing
        let cleanPath = dbPath.replace(/^uploads\//, "");
        if (cleanPath.startsWith("/")) cleanPath = cleanPath.slice(1);
        previewUrl = `${IMAGE_BASE_URL}/uploads/${cleanPath}`;
      }
    }

    setForm({
      title: initialData.title || "",
      description: initialData.description || "",
      venue: initialData.venue || "",
      date: initialData.date || "",
      month: initialData.month || "",
      youtubeUrl: initialData.youtubeUrl || "",
      image: null, // Keep null so we don't re-upload unless changed
      preview: previewUrl,
    });
  }, [initialData]);

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
      image: form.image,
    });

    // Reset form if creating new (not editing)
    if (!initialData) {
      setForm(emptyForm);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    onCancel?.();
  };

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
        {/* FORM FIELDS */}
        <div>
          <label className="font-semibold flex gap-2">
            <Type className="text-gray-500" /> Event Title
          </label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={form.title}
            onChange={handleChange("title")}
            required
            placeholder="e.g. Annual Charity Gala"
          />
        </div>

        <div>
          <label className="font-semibold flex gap-2">
            <MapPin className="text-gray-500" /> Venue
          </label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={form.venue}
            onChange={handleChange("venue")}
            required
            placeholder="e.g. City Hall, Main Auditorium"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold flex gap-2">
              <Calendar className="text-gray-500" /> Date
            </label>
            <input
              type="number"
              min="1"
              max="31"
              className="w-full border p-2 rounded mt-1"
              value={form.date}
              onChange={handleChange("date")}
              required
              placeholder="25"
            />
          </div>
          <div>
            <label className="font-semibold">Month & Year</label>
            <input
              className="w-full border p-2 rounded mt-1"
              value={form.month}
              onChange={handleChange("month")}
              required
              placeholder="July 2025"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full border p-2 rounded mt-1"
            value={form.description}
            onChange={handleChange("description")}
            required
            rows="3"
          />
        </div>

        {/* IMAGE UPLOAD SECTION */}
        <div>
          <label className="font-semibold flex gap-2 mb-2">
            <Image className="text-gray-500" /> Cover Image
          </label>

          {!form.preview ? (
            <label className="border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <Upload className="text-gray-400 mb-2" size={32} />
              <span className="text-gray-600 font-medium">
                Click to Upload Image
              </span>
              <span className="text-xs text-gray-400 mt-1">
                JPG, PNG, WebP supported
              </span>
              <input
                type="file"
                hidden
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
          ) : (
            <div className="relative inline-block mt-2">
              <img
                src={form.preview}
                alt="Event preview"
                className="rounded-lg object-cover w-full max-w-sm h-48 border shadow-sm"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/400x300?text=Preview+Error";
                }}
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
        </div>

        <div>
          <label className="font-semibold">YouTube URL (optional)</label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={form.youtubeUrl}
            onChange={handleChange("youtubeUrl")}
            placeholder="https://youtube.com/..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-orange-600 text-white px-8 py-2.5 rounded hover:bg-orange-700 transition font-medium shadow-sm"
          >
            {initialData ? "Update Event" : "Create Event"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded hover:bg-gray-50 transition font-medium"
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
