import { useEffect, useState } from "react";
import PartnerForm from "./PartnerForm.jsx";
import { partnersAPI } from "../../../services/api.js";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";

const PartnerManagement = () => {
  const [partners, setPartners] = useState([]);
  const [editingPartner, setEditingPartner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");

  // Fetch all partners
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

  // Create / Update Partner
  const handleSubmit = async (data) => {
    const formData = new FormData();
    ["name", "description", "isActive"].forEach((key) =>
      formData.append(key, data[key])
    );
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
      const message =
        err.response?.data?.message || "Partner save failed";
      alert(message);
    }
  };

  // Delete partner
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

  // Build image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    const cleanPath = imagePath.replace(/^uploads\//, "");
    return `${IMAGE_BASE_URL}/uploads/${cleanPath}`;
  };

  // Sorted partners based on createdAt and sortOrder
  const sortedPartners = [...partners].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      {/* Partner Form */}
      <PartnerForm
        onSubmit={handleSubmit}
        initialData={editingPartner}
        onCancel={() => setEditingPartner(null)}
      />

      <hr />

      {/* Sorting Dropdown */}
      <div className="flex justify-end">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Partners Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading partners...</p>
      ) : sortedPartners.length === 0 ? (
        <p className="text-center text-gray-500">No partners added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedPartners.map((partner) => (
            <div
              key={partner._id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden"
            >
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
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      partner.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {partner.isActive ? "Active" : "Inactive"}
                  </span>
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
