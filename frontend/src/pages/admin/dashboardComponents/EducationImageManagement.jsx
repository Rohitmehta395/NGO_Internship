import React, { useState, useEffect } from "react";
import { educationImagesAPI } from "../../../services/api.js";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";
import { toast } from "react-toastify";
import { Upload, X, Trash2 } from "lucide-react";

const EducationImageManagement = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      await educationImagesAPI.upload(formData);
      toast.success("Image uploaded!");
      fetchImages();
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
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

  return (
    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-green-500">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Education Section Images
      </h2>

      {/* Upload Area */}
      <div className="mb-8">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <p className="text-sm text-gray-500">Uploading...</p>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> a new
                  image
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Image Gallery */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="relative group aspect-[3/4] rounded-lg overflow-hidden shadow-sm border"
            >
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
          {images.length === 0 && (
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
