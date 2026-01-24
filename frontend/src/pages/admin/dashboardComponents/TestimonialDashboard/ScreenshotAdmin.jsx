import { useEffect, useState, useRef } from "react";
import { Image, Upload, Trash2, X, GripVertical } from "lucide-react";
import { toast } from "react-toastify"; // <--- Import Toast
import { screenshotsAPI } from "../../../../services/api";
import { IMAGE_BASE_URL } from "../../../../utils/constants";

const emptyForm = {
  alt: "",
  date: "",
  image: null,
  preview: null,
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  let cleanPath = imagePath.replace(/^uploads\//, "");
  if (cleanPath.startsWith("/")) cleanPath = cleanPath.slice(1);
  return `${IMAGE_BASE_URL}/uploads/${cleanPath}`;
};

const ScreenshotAdmin = () => {
  const [screenshots, setScreenshots] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("manual");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  /* ================= FETCH ================= */
  const fetchScreenshots = async () => {
    try {
      const res = await screenshotsAPI.getAll();
      setScreenshots(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch screenshots");
    }
  };

  useEffect(() => {
    fetchScreenshots();
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
    const _screenshots = [...screenshots];
    const draggedItemContent = _screenshots.splice(dragItem.current, 1)[0];
    _screenshots.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setScreenshots(_screenshots);

    const itemsToUpdate = _screenshots.map((item, index) => ({
      _id: item._id,
      order: index,
    }));

    try {
      await screenshotsAPI.reorder(itemsToUpdate);
      toast.success("Order updated!");
    } catch (err) {
      toast.error("Failed to reorder");
      fetchScreenshots();
    }
  };

  /* ================= IMAGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
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

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("alt", form.alt);
      if (form.date) formData.append("date", form.date);
      if (form.image) formData.append("image", form.image);

      if (editingId) {
        await screenshotsAPI.update(editingId, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Updated successfully!");
      } else {
        if (!form.image) {
          toast.error("Image is required");
          setLoading(false);
          return;
        }
        await screenshotsAPI.create(formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Created successfully!");
      }

      resetForm();
      fetchScreenshots();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (s) => {
    setForm({
      alt: s.alt || "",
      date: s.date ? new Date(s.date).toISOString().split("T")[0] : "",
      image: null,
      preview: getImageUrl(s.image),
    });
    setEditingId(s._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await screenshotsAPI.delete(id);
      fetchScreenshots();
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  /* ================= SORTING ================= */
  const sortedScreenshots =
    sortOrder === "manual"
      ? screenshots
      : [...screenshots].sort((a, b) => {
          const dateA = new Date(a.date || a.createdAt || 0);
          const dateB = new Date(b.date || b.createdAt || 0);
          return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* FORM */}
      <div className="bg-white p-6 rounded-lg shadow border-t-4 border-orange-500">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            {editingId ? "✏️ Edit Gesture" : "🖼️ Add Gesture"}
          </h2>
          {editingId && (
            <button onClick={resetForm}>
              <X />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Alt Text (Description)</label>
              <input
                className="w-full border p-2 rounded mt-1"
                value={form.alt}
                onChange={(e) =>
                  setForm((p) => ({ ...p, alt: e.target.value }))
                }
                required
                placeholder="e.g. Letter from XYZ"
              />
            </div>
            <div>
              <label className="font-semibold">Date</label>
              <input
                type="date"
                className="w-full border p-2 rounded mt-1"
                value={form.date}
                onChange={(e) =>
                  setForm((p) => ({ ...p, date: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="font-semibold flex gap-2 mb-2">
              <Image className="text-gray-500" /> Image (Letter/Email Scan)
            </label>

            {!form.preview ? (
              <label className="border-2 border-dashed border-gray-300 p-8 flex flex-col items-center rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="text-gray-400 mb-2" size={32} />
                <span className="text-gray-600">Click to upload image</span>
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
              <div className="relative inline-block">
                <img
                  src={form.preview}
                  className="h-48 w-full max-w-sm object-contain rounded border bg-gray-100"
                  alt="Preview"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 text-white px-6 py-2 rounded"
            >
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border px-6 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LIST */}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedScreenshots.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No letters or emails found.
            </p>
          )}
          {sortedScreenshots.map((s, index) => (
            <div
              key={s._id}
              draggable={sortOrder === "manual"}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`bg-white border rounded shadow-sm overflow-hidden flex flex-col hover:shadow-md transition relative ${sortOrder === "manual" ? "cursor-move" : ""}`}
            >
              {sortOrder === "manual" && (
                <div className="absolute top-2 right-2 z-10 bg-black/30 p-1 rounded text-white">
                  <GripVertical size={16} />
                </div>
              )}
              <div className="h-48 bg-gray-100 flex items-center justify-center p-2">
                <img
                  src={getImageUrl(s.image)}
                  alt={s.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-800">{s.alt}</p>
                  {s.date && (
                    <p className="text-xs text-gray-500 mt-1">
                      Date: {new Date(s.date).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(s)}
                    className="text-blue-600 bg-blue-50 px-3 py-1 rounded text-sm flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="text-red-600 bg-red-50 px-3 py-1 rounded text-sm flex-1"
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

export default ScreenshotAdmin;
