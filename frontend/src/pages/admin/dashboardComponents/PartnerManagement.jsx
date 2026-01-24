import { useEffect, useState, useRef } from "react";
import PartnerForm from "./PartnerForm.jsx";
import { partnersAPI } from "../../../services/api.js";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";
import { GripVertical } from "lucide-react";

const PartnerManagement = () => {
  const [partners, setPartners] = useState([]);
  const [editingPartner, setEditingPartner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("manual");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const res = await partnersAPI.getAll();
      setPartners(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  /* --- DRAG HANDLERS --- */
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
    const _partners = [...partners];
    const draggedItemContent = _partners.splice(dragItem.current, 1)[0];
    _partners.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setPartners(_partners);

    const itemsToUpdate = _partners.map((item, index) => ({
      _id: item._id,
      order: index,
    }));

    try {
      await partnersAPI.reorder(itemsToUpdate);
    } catch (err) {
      console.error("Reorder failed", err);
      fetchPartners();
    }
  };

  const handleSubmit = async (data) => {
    const formData = new FormData();
    ["name", "description"].forEach((key) => formData.append(key, data[key]));
    if (data.image) formData.append("image", data.image);

    try {
      if (editingPartner) {
        await partnersAPI.update(editingPartner._id, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        if (!data.image) {
          alert("Image is required");
          return;
        }
        await partnersAPI.create(formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setEditingPartner(null);
      fetchPartners();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Partner save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this partner?")) return;
    try {
      await partnersAPI.delete(id);
      fetchPartners();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    const cleanPath = imagePath.replace(/^uploads\//, "");
    return `${IMAGE_BASE_URL}/uploads/${cleanPath}`;
  };

  const sortedPartners =
    sortOrder === "manual"
      ? partners
      : [...partners].sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      <PartnerForm
        onSubmit={handleSubmit}
        initialData={editingPartner}
        onCancel={() => setEditingPartner(null)}
      />
      <hr />
      <div className="flex justify-end">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="manual">Manual Order (Drag & Drop)</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading partners...</p>
      ) : sortedPartners.length === 0 ? (
        <p className="text-center text-gray-500">No partners added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedPartners.map((partner, index) => (
            <div
              key={partner._id}
              draggable={sortOrder === "manual"}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`bg-white border rounded-lg shadow-sm overflow-hidden relative ${sortOrder === "manual" ? "cursor-move" : ""}`}
            >
              {sortOrder === "manual" && (
                <div className="absolute top-2 right-2 z-10 bg-black/30 p-1 rounded text-white">
                  <GripVertical size={16} />
                </div>
              )}
              <div className="h-32 bg-gray-100">
                <img
                  src={getImageUrl(partner.imageUrl)}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{partner.name}</h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {partner.description}
                </p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setEditingPartner(partner)}
                    className="text-blue-600 bg-blue-50 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(partner._id)}
                    className="text-red-600 bg-red-50 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerManagement;
