import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Upload, Image as ImageIcon, Save, AlertCircle } from "lucide-react";
import { heroImagesAPI } from "../../../services/api";
import { API_BASE_URL } from "../../../utils/constants";

const HeroImageManagement = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [currentImage, setCurrentImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Configuration for different pages
  const pageConfig = {
    home: {
      title: "Home Page Hero",
      recommendedSize: "1920 x 1080 px",
      aspectRatio: "16:9",
    },
    sulabh: {
      title: "Sulabh App Page Hero",
      recommendedSize: "1920 x 850 px",
      aspectRatio: "Wide Landscape",
    },
    about: {
      title: "About Us Banner",
      recommendedSize: "1920 x 400 px",
      aspectRatio: "Wide Banner",
    },
    programs: {
      title: "Programs Banner",
      recommendedSize: "1920 x 400 px",
      aspectRatio: "Wide Banner",
    },
    partners: {
      title: "Partners Banner",
      recommendedSize: "1920 x 400 px",
      aspectRatio: "Wide Banner",
    },
    events: {
      title: "Events Banner",
      recommendedSize: "1920 x 400 px",
      aspectRatio: "Wide Banner",
    },
    blogs: {
      title: "Blogs Banner",
      recommendedSize: "1920 x 400 px",
      aspectRatio: "Wide Banner",
    },
    testimonials: {
      title: "Testimonials Banner",
      recommendedSize: "1920 x 400 px",
      aspectRatio: "Wide Banner",
    },
  };

  useEffect(() => {
    fetchCurrentImage();
    setPreview(null);
    setFile(null);
  }, [selectedPage]);

  const fetchCurrentImage = async () => {
    try {
      const { data } = await heroImagesAPI.get(selectedPage);
      if (data.success) {
        setCurrentImage(`${API_BASE_URL}${data.data.imageUrl}`);
      }
    } catch (error) {
      // 404 is expected if no image is set yet
      setCurrentImage(null);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.type.match("image.*")) {
      toast.error("Please select a valid image file (jpg, png, webp)");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warning("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const { data } = await heroImagesAPI.update(selectedPage, formData);

      if (data.success) {
        toast.success(
          `${pageConfig[selectedPage].title} updated successfully!`,
        );
        setCurrentImage(`${API_BASE_URL}${data.data.imageUrl}`);
        setFile(null);
        setPreview(null);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Upload failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Hero Image Manager
          </h2>
          <p className="text-gray-500 text-sm">
            Update the banner images for key pages.
          </p>
        </div>

        <div className="w-full md:w-64">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Page
          </label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          >
            <option value="home">Home Page</option>
            <option value="sulabh">Sulabh Page</option>
            <option value="about">About Us</option>
            <option value="programs">Programs</option>
            <option value="partners">Partners</option>
            <option value="events">Events</option>
            <option value="blogs">Blogs</option>
            <option value="testimonials">Testimonials</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-orange-500" />
            Upload New Image
          </h3>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-medium">
                  Requirements:
                </p>
                <ul className="text-sm text-blue-700 list-disc ml-4 mt-1 space-y-1">
                  <li>
                    Recommended Size:{" "}
                    <span className="font-bold">
                      {pageConfig[selectedPage].recommendedSize}
                    </span>
                  </li>
                  <li>Max Size: 5MB</li>
                  <li>Formats: JPG, PNG, WEBP</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-gray-400 text-sm mt-1">SVG, PNG, JPG or GIF</p>
            </div>
          </div>

          {preview && (
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-2">
                New Image Preview:
              </p>
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {loading ? (
                    "Uploading..."
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Change
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Current Image Display */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-green-600" />
            Current Live Image
          </h3>

          <div className="rounded-lg overflow-hidden bg-gray-100 border border-gray-200 min-h-[200px] flex items-center justify-center">
            {currentImage ? (
              <img
                src={currentImage}
                alt="Current Hero"
                className="w-full h-auto max-h-[400px] object-contain"
              />
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-400">Using default hardcoded image</p>
                <p className="text-xs text-gray-400 mt-1">
                  (Upload a new image to override)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImageManagement;
