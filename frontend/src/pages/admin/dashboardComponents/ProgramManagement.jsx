import React, { useState, useEffect } from "react";
import { programsAPI } from "../../../services/api";
import {
  FaEdit,
  FaTrash,
  FaCloudUploadAlt,
  FaLayerGroup,
  FaFileAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { API_BASE_URL } from "../../../utils/constants";

const ProgramManagement = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [mode, setMode] = useState("main"); // 'main' or 'content'

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "image",
    category: "main",
    slug: "",
    videoUrl: "",
    image: null,
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await programsAPI.getAll();
      setPrograms(res.data.data || []);
    } catch (error) {
      console.error("Error fetching programs", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter "Parent" programs for the dropdown
  // We check for category 'main' AND that a slug exists
  const existingSections = programs.filter((p) => p.category === "main");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug (only when creating a new Main program)
    if (name === "title" && mode === "main" && !isEditing) {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .trim()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const resetForm = (targetMode = mode) => {
    // If switching to content mode, grab the first available section slug
    const defaultCategory =
      targetMode === "main" ? "main" : existingSections[0]?.slug || "";

    setFormData({
      title: "",
      description: "",
      type: "image",
      category: defaultCategory,
      slug: "",
      videoUrl: "",
      image: null,
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    resetForm(newMode);
  };

  const handleEdit = (program) => {
    setIsEditing(true);
    setEditId(program._id);

    const editMode = program.category === "main" ? "main" : "content";
    setMode(editMode);

    setFormData({
      title: program.title,
      description: program.description,
      type: program.type,
      category: program.category,
      slug: program.slug || "", // Handle missing slug
      videoUrl: program.type === "video" ? program.source : "",
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      try {
        await programsAPI.delete(id);
        fetchPrograms();
      } catch (error) {
        alert("Error deleting program");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("type", formData.type);

    if (mode === "main") {
      data.append("category", "main");
      // Fallback: if user didn't type slug, make one from title
      const finalSlug =
        formData.slug || formData.title.toLowerCase().replace(/ /g, "-");
      data.append("slug", finalSlug);
      data.append("route", `/programs/${finalSlug}`);
    } else {
      data.append("category", formData.category);
    }

    if (formData.type === "video") {
      data.append("videoUrl", formData.videoUrl);
    } else if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (isEditing) {
        await programsAPI.update(editId, data);
      } else {
        await programsAPI.create(data);
      }
      fetchPrograms();
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Error saving program");
    }
  };

  const renderMedia = (prog) => {
    if (prog.type === "video") {
      return (
        <iframe
          src={prog.source}
          title={prog.title}
          className="w-full h-full object-cover"
        />
      );
    }
    const imgSrc = prog.source.startsWith("http")
      ? prog.source
      : `${API_BASE_URL}/${prog.source}`;
    return (
      <img
        src={imgSrc}
        alt={prog.title}
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-gray-50 min-h-[500px]">
      {/* --- LEFT: FORM SECTION --- */}
      <div className="lg:w-1/3 w-full">
        <div className="bg-white p-6 rounded-xl shadow-md sticky top-4">
          <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => handleModeSwitch("main")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition ${mode === "main" ? "bg-white shadow text-orange-600 font-bold" : "text-gray-500 hover:text-gray-700"}`}
            >
              <FaLayerGroup /> New Page
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch("content")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition ${mode === "content" ? "bg-white shadow text-blue-600 font-bold" : "text-gray-500 hover:text-gray-700"}`}
            >
              <FaFileAlt /> Page Content
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            {isEditing
              ? "Edit Item"
              : mode === "main"
                ? "Create Main Program"
                : "Add Content to Page"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "main" ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Page ID (Slug)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="e.g. food-drive"
                  required
                  className="w-full border border-gray-300 p-2.5 rounded-lg bg-gray-50 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Creates URL: /programs/
                  <strong>{formData.slug || "..."}</strong>
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Select Program Page
                </label>
                {existingSections.length > 0 ? (
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      -- Select a Program --
                    </option>
                    {existingSections.map((sec) => (
                      <option key={sec._id} value={sec.slug || "missing-slug"}>
                        {sec.title}{" "}
                        {sec.slug ? `( /${sec.slug} )` : "(Legacy Data)"}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200">
                    ⚠️ No "Main" Programs found. Switch tabs to create one
                    first.
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2.5 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full border border-gray-300 p-2.5 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Media Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 rounded-lg"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>

            {formData.type === "image" ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <FaCloudUploadAlt className="text-3xl text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {formData.image
                      ? formData.image.name
                      : "Click to upload image"}
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Video Embed URL
                </label>
                <input
                  type="text"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2.5 rounded-lg"
                />
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={mode === "content" && existingSections.length === 0}
                className={`flex-1 text-white font-bold py-3 rounded-lg shadow-lg transition disabled:opacity-50 ${mode === "main" ? "bg-orange-600 hover:bg-orange-700" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {isEditing
                  ? "Update Item"
                  : mode === "main"
                    ? "Create Program"
                    : "Add Content"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* --- RIGHT: LIST SECTION --- */}
      <div className="lg:w-2/3 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-1 border-l-4 border-orange-500 ml-2">
          {mode === "main" ? "Main Programs (Cards)" : "Inner Page Content"}
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs
              .filter((p) =>
                mode === "main" ? p.category === "main" : p.category !== "main",
              )
              .map((prog) => (
                <div
                  key={prog._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col"
                >
                  <div className="h-48 bg-gray-100 relative group">
                    {renderMedia(prog)}

                    {/* Action Buttons */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-200">
                      <button
                        onClick={() => handleEdit(prog)}
                        className="bg-white p-2.5 rounded-full text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(prog._id)}
                        className="bg-white p-2.5 rounded-full text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    {/* Badges - SAFE VERSION (Prevents 'undefined') */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                      {prog.category === "main" ? (
                        <span className="text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide bg-orange-100 text-orange-800">
                          {prog.slug ? `/${prog.slug}` : "MISSING SLUG"}
                        </span>
                      ) : (
                        <span className="text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide bg-blue-100 text-blue-800">
                          Page: {prog.category}
                        </span>
                      )}

                      {/* Warning for old data */}
                      {prog.category === "main" && !prog.slug && (
                        <span className="text-[10px] bg-red-500 text-white px-1 rounded flex items-center gap-1">
                          <FaExclamationTriangle /> Delete & Re-add
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {prog.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 flex-1 line-clamp-3">
                      {prog.description}
                    </p>
                  </div>
                </div>
              ))}

            {programs.filter((p) =>
              mode === "main" ? p.category === "main" : p.category !== "main",
            ).length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-400 bg-white border border-dashed rounded-xl">
                <p>No {mode === "main" ? "Main Programs" : "Content"} found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramManagement;
