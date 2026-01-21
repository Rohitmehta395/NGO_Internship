import React, { useState, useEffect, useRef } from "react";
import { sulabhAPI } from "../../../services/api";
import { API_BASE_URL } from "../../../utils/constants";
import {
  FaEdit,
  FaTrash,
  FaCloudUploadAlt,
  FaLayerGroup,
  FaCubes,
  FaGripVertical,
  FaLink,
  FaYoutube,
} from "react-icons/fa";

const SulabhManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryTab, setCategoryTab] = useState("mission"); // 'mission' or 'core_module'
  const [sortOrder, setSortOrder] = useState("manual"); // 'manual', 'newest', 'oldest'

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "mission",
    learnMoreLink: "",
    videoLink: "",
    image: null,
  });

  // Drag & Drop Refs
  const dragItem = useRef();
  const dragOverItem = useRef();

  // --- Fetch Data ---
  const fetchSulabhData = async () => {
    setLoading(true);
    try {
      // If custom/manual, don't send sort param (defaults to order)
      // If newest/oldest, send sort param
      const params = { category: categoryTab };
      if (sortOrder !== "manual") params.sort = sortOrder;

      const res = await sulabhAPI.getAll(params);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSulabhData();
    // Reset form when tab changes (but keep category synced)
    resetForm(categoryTab);
  }, [categoryTab, sortOrder]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const resetForm = (targetCategory = categoryTab) => {
    setFormData({
      title: "",
      description: "",
      category: targetCategory,
      learnMoreLink: "",
      videoLink: "",
      image: null,
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleTabSwitch = (newCategory) => {
    setCategoryTab(newCategory);
    // Form reset handled by useEffect dependency
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item._id);

    // Switch tab if needed (though list only shows current tab items)
    setCategoryTab(item.category);

    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      learnMoreLink: item.learnMoreLink || "",
      videoLink: item.videoLink || "",
      image: null, // Reset file input
    });

    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await sulabhAPI.delete(id);
      fetchSulabhData();
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete item.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      // Don't append image if null
      if (key === "image" && formData[key] === null) return;
      dataToSend.append(key, formData[key]);
    });

    try {
      if (isEditing) {
        await sulabhAPI.update(editId, dataToSend);
        alert("Item updated successfully!");
      } else {
        await sulabhAPI.create(dataToSend);
        alert("Item added successfully!");
      }
      resetForm();
      fetchSulabhData();
    } catch (err) {
      console.error("Error saving item:", err);
      alert("Failed to save item");
    }
  };

  // --- Drag and Drop Logic ---
  const handleDragStart = (e, position) => {
    if (sortOrder !== "manual") return;
    dragItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    if (sortOrder !== "manual") return;
    dragOverItem.current = position;
  };

  const handleDragEnd = async () => {
    if (sortOrder !== "manual") return;

    const copyListItems = [...data];
    const dragItemContent = copyListItems[dragItem.current];

    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setData(copyListItems); // Optimistic Update

    try {
      const itemsToSend = copyListItems.map((item, index) => ({
        _id: item._id,
        order: index,
      }));
      await sulabhAPI.reorder(itemsToSend);
    } catch (err) {
      console.error("Failed to save order", err);
      alert("Failed to save order");
      fetchSulabhData(); // Revert
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-gray-50 min-h-[500px]">
      {/* --- LEFT: FORM SECTION --- */}
      <div className="lg:w-1/3 w-full">
        <div className="bg-white p-6 rounded-xl shadow-md sticky top-4">
          {/* Tab Switcher */}
          <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => handleTabSwitch("mission")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition ${
                categoryTab === "mission"
                  ? "bg-white shadow text-orange-600 font-bold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaLayerGroup /> Missions
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch("core_module")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition ${
                categoryTab === "core_module"
                  ? "bg-white shadow text-blue-600 font-bold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaCubes /> Core Modules
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            {isEditing
              ? `Edit ${categoryTab === "mission" ? "Mission" : "Module"}`
              : `Create ${categoryTab === "mission" ? "Mission" : "Module"}`}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter title"
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
                placeholder="Enter description"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Image {isEditing && "(Leave empty to keep current)"}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer relative">
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  required={!isEditing}
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
            </div>

            {/* Mission Specific Fields */}
            {categoryTab === "mission" && (
              <div className="space-y-4 pt-2 border-t mt-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <FaLink className="text-gray-400" /> Learn More Link
                    (Optional)
                  </label>
                  <input
                    type="text"
                    name="learnMoreLink"
                    value={formData.learnMoreLink}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full border border-gray-300 p-2.5 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <FaYoutube className="text-red-500" /> Video Link (Optional)
                  </label>
                  <input
                    type="text"
                    name="videoLink"
                    value={formData.videoLink}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/..."
                    className="w-full border border-gray-300 p-2.5 rounded-lg"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className={`flex-1 text-white font-bold py-3 rounded-lg shadow-lg transition ${
                  categoryTab === "mission"
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isEditing ? "Update Item" : "Create Item"}
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pl-1 border-l-4 border-orange-500 ml-2 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {categoryTab === "mission" ? "Missions" : "Core Modules"}
          </h2>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="manual">Manual Order (Drag)</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {sortOrder === "manual" && (
          <p className="text-xs text-gray-500 italic mb-4 ml-2">
            * Drag and drop items to reorder how they appear on the website.
          </p>
        )}

        {loading ? (
          <p className="text-gray-500 ml-2">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((item, index) => (
              <div
                key={item._id}
                draggable={sortOrder === "manual"}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col ${
                  sortOrder === "manual" ? "cursor-move" : "cursor-default"
                }`}
              >
                {/* Media Area */}
                <div className="h-48 bg-gray-100 relative group">
                  <img
                    src={`${API_BASE_URL}${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Drag Handle (Visual) */}
                  {sortOrder === "manual" && (
                    <div className="absolute top-2 right-2 z-10 bg-black/30 p-1 rounded text-white opacity-70">
                      <FaGripVertical />
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-200">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-white p-2.5 rounded-full text-blue-600 hover:text-blue-800 shadow-lg transform hover:scale-110 transition"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-white p-2.5 rounded-full text-red-500 hover:text-red-700 shadow-lg transform hover:scale-110 transition"
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>

                  {/* Link Badges */}
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    {item.learnMoreLink && (
                      <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <FaLink size={10} /> Link
                      </span>
                    )}
                    {item.videoLink && (
                      <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <FaYoutube size={10} /> Video
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 flex flex-col flex-1">
                  <h3
                    className="font-bold text-lg text-gray-800 mb-1 line-clamp-1"
                    title={item.title}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2 flex-1 line-clamp-3">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-auto pt-2 border-t">
                    {categoryTab === "mission" ? "Mission Item" : "Core Module"}
                  </p>
                </div>
              </div>
            ))}

            {data.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-400 bg-white border border-dashed rounded-xl">
                <p>
                  No {categoryTab === "mission" ? "missions" : "modules"} found.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SulabhManagement;
