import React, { useState, useEffect, useRef } from "react";
import { educationImagesAPI } from "../../../services/api.js";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";
import { toast } from "react-toastify";
import { Upload, X, Trash2, GripVertical } from "lucide-react";

const EducationImageManagement = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [sortOrder, setSortOrder] = useState("manual");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await educationImagesAPI.getAll();
      setImages(res.data.data);
    } catch (error) {
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    let hasError = false;

    // FILE SIZE CHECK (1MB Limit)
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 1024 * 1024) {
        toast.error(`File "${files[i].name}" exceeds 1MB limit. Skipped.`);
        hasError = true;
        continue;
      }
      formData.append("images", files[i]);
    }

    // If all files were too big
    if (!formData.has("images")) {
      if (!hasError) toast.info("No files selected");
      e.target.value = "";
      return;
    }

    setUploading(true);
    try {
      await educationImagesAPI.upload(formData);
      toast.success("Images uploaded successfully!");
      if (hasError) toast.warn("Some large files were skipped.");
      fetchImages();
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await educationImagesAPI.delete(id);
      toast.success("Image deleted");
      fetchImages();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  /* ================= DRAG AND DROP ================= */
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
    const _images = [...images];

    // Remove dragged item
    const draggedItemContent = _images.splice(dragItem.current, 1)[0];

    // Insert at new position
    _images.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setImages(_images); // Optimistic UI update

    const itemsToUpdate = _images.map((item, index) => ({
      _id: item._id,
      order: index,
    }));

    try {
      await educationImagesAPI.reorder(itemsToUpdate);
    } catch (err) {
      console.error("Reorder failed", err);
      toast.error("Failed to save new order");
      fetchImages(); // Revert on error
    }
  };

  /* ================= SORTING ================= */
  const getSortedImages = () => {
    if (sortOrder === "manual") return images;

    return [...images].sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  };

  const sortedImages = getSortedImages();

  return (
    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-green-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800">
          Education Section Images
        </h2>

        {/* Sort Filter */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="manual">Manual Order (Drag & Drop)</option>
          <option value="newest">Newest Uploads</option>
          <option value="oldest">Oldest Uploads</option>
        </select>
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition relative">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            {uploading ? (
              <p className="text-sm text-gray-500">Uploading...</p>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> new
                  images
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Recommended Size: 600x800px (Portrait)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Image Gallery */}
      {loading ? (
        <p className="text-center py-4">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sortedImages.map((img, index) => (
            <div
              key={img._id}
              draggable={sortOrder === "manual"}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`relative group aspect-[3/4] rounded-lg overflow-hidden shadow-sm border ${
                sortOrder === "manual" ? "cursor-move" : ""
              }`}
            >
              {sortOrder === "manual" && (
                <div className="absolute top-2 left-2 z-10 bg-black/40 p-1 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical size={14} />
                </div>
              )}

              <img
                src={`${IMAGE_BASE_URL}/${img.image}`}
                alt="Education"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDelete(img._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Delete Image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {sortedImages.length === 0 && (
            <p className="col-span-full text-center text-gray-400 py-4">
              No images uploaded yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EducationImageManagement;
