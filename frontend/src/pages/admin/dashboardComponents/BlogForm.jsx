import React, { useState, useEffect } from "react";
import {
  Image,
  Upload,
  X,
  Type,
  User,
  AlignLeft,
  FileText,
  Trash2,
} from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";

const BlogForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [image, setImage] = useState(null); // File object for new uploads
  const [preview, setPreview] = useState(null); // URL for preview

  // Load initial data for Editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setContent(initialData.content || "");
      setAuthor(initialData.author || "Admin");

      // Handle existing image preview
      if (initialData.image) {
        const imgUrl = initialData.image.startsWith("http")
          ? initialData.image
          : `${IMAGE_BASE_URL}/${initialData.image}`;
        setPreview(imgUrl);
      }
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setAuthor("Admin");
    setImage(null);
    setPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    // Note: If editing, this visually removes it.
    // You might need a specific flag if you want to force delete it on backend,
    // but usually uploading a new one or leaving it overrides it.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass data back to parent
    onSubmit({ title, description, content, author, image });

    // Only reset if it's a new entry, otherwise keep data until parent closes edit mode
    if (!initialData) {
      resetForm();
    }
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) onCancel();
  };

  // Quill Configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ align: [] }],
      ["link", "image"], // Image button allows inserting images into article
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "align",
    "link",
    "image",
  ];

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow mb-8 border-t-4 ${
        initialData ? "border-blue-500" : "border-orange-500"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {initialData ? <>✏️ Edit Article</> : <>📝 Write New Article</>}
        </h2>
        {onCancel && (
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            title="Cancel Editing"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Type className="w-4 h-4 text-orange-500" /> Article Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4 text-orange-500" /> Author Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-500" /> Short Description
            </label>
            <textarea
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition h-20 resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Cover Image Upload */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Image className="w-4 h-4 text-orange-500" /> Cover Image
            </label>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <label className="flex flex-col items-center px-4 py-6 bg-gray-50 text-orange-500 rounded-lg shadow-inner border border-dashed border-gray-300 cursor-pointer hover:bg-orange-50 transition border-orange-200">
                  <Upload className="w-8 h-8 text-orange-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {preview
                      ? "Click to replace image"
                      : "Click to upload cover image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Image Preview & Delete Button */}
              {preview && (
                <div className="w-32 h-24 relative rounded-lg overflow-hidden border border-gray-200 shadow-sm shrink-0 group">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    title="Remove Image"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
            <AlignLeft className="w-4 h-4 text-orange-500" /> Full Content
          </label>
          <div className="bg-white">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Write your article content here..."
              className="h-64 mb-12"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className={`${
              initialData
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-orange-500 hover:bg-orange-600"
            } text-white px-8 py-2.5 rounded-lg transition font-medium shadow-md hover:shadow-lg transform active:scale-95 duration-200`}
          >
            {initialData ? "Update Article" : "Publish Article"}
          </button>

          {/* Show cancel button if we are editing or if form is dirty */}
          {(onCancel || title || content) && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
