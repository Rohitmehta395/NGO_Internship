import { useEffect, useState } from "react";
import PartnerForm from "./PartnerForm.jsx";
import { partnersAPI } from "../../../services/api.js";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";

const PartnerManagement = () => {
  const [partners, setPartners] = useState([]);
  const [editingPartner, setEditingPartner] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (data) => {
    const formData = new FormData();
    ["name", "description", "order", "isActive"].forEach((key) =>
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
      if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("Upload failed");
        }
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

    let cleanPath = imagePath.replace(/^uploads\//, "");
    if (cleanPath.startsWith("/")) cleanPath = cleanPath.slice(1);

    return `${IMAGE_BASE_URL}/uploads/${cleanPath}`;
  };

  const sortedPartners = [...partners].sort(
    (a, b) => a.order - b.order || new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      <PartnerForm
        onSubmit={handleSubmit}
        initialData={editingPartner}
        onCancel={() => setEditingPartner(null)}
      />

      <hr />

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
