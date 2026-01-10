import React, { useEffect, useState } from "react";
import { Image, Upload, X, Type, MapPin, Calendar, Trash2 } from "lucide-react";
import { IMAGE_BASE_URL } from "../../utils/constants";

const EventForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ================= LOAD DATA FOR EDIT ================= */
  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title || "");
    setDescription(initialData.description || "");
    setVenue(initialData.venue || "");
    setDate(initialData.date || "");
    setMonth(initialData.month || "");
    setYoutubeUrl(initialData.youtubeUrl || "");

    if (initialData.imageUrl) {
      const imgUrl = initialData.imageUrl.startsWith("http")
        ? initialData.imageUrl
        : `${IMAGE_BASE_URL}/${initialData.imageUrl}`;
      setPreview(imgUrl);
    }
  }, [initialData]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setVenue("");
    setDate("");
    setMonth("");
    setYoutubeUrl("");
    setImage(null);
    setPreview(null);
  };

  /* ================= IMAGE ================= */
  const handleImageChange = (e) => {
  const file = e.target.files[0];
  console.log("Selected file:", file);  // <--- ADD THIS
  if (!file) return;

  setImage(file);
  setPreview(URL.createObjectURL(file));
};


  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      venue,
      date: Number(date),
      month,
      youtubeUrl,
      image,
    });

    if (!initialData) resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-orange-500">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">
          {initialData ? "✏️ Edit Event" : "📅 Create Event"}
        </h2>
        {onCancel && (
          <button onClick={onCancel}>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Month & Year</label>
            <input
              className="w-full border p-2 rounded"
              placeholder="July 2025"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

          {preview && (
            <div className="relative w-32 mt-3">
              <img src={preview} className="rounded" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute inset-0 bg-black/50 text-white"
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
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
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
              onClick={onCancel}
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
