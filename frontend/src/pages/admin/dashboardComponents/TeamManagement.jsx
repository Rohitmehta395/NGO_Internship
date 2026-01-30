// frontend/src/pages/admin/dashboardComponents/TeamManagement.jsx
import React, { useEffect, useState, useRef } from "react";
import { membersAPI } from "../../../services/api.js";
import { toast } from "react-toastify";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";
import { GripVertical } from "lucide-react";

const TeamManagement = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [sortOrder, setSortOrder] = useState("manual"); // Default to manual for drag-drop reordering

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("trustee");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const categories = [
    { id: "guiding-spirit", label: "Guiding Spirit" },
    { id: "trustee", label: "Trustees (Karyakartas)" },
    { id: "advisor", label: "Advisory Board (MargaDarshaks)" },
    { id: "patron", label: "Patrons" },
    { id: "volunteer", label: "Volunteers" },
  ];

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await membersAPI.getAll();
      setMembers(res.data.data);
    } catch (error) {
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e, index) => {
    if (sortOrder !== "manual") return;
    dragItem.current = index;
  };

  const handleDragEnter = (e, index) => {
    if (sortOrder !== "manual") return;
    dragOverItem.current = index;
  };

  const handleDragEnd = async (categoryId) => {
    if (sortOrder !== "manual") return;

    // 1. Get current members for this specific category
    const catMembers = members.filter((m) => m.category === categoryId);
    const otherMembers = members.filter((m) => m.category !== categoryId);

    // 2. Perform the swap in a new array
    const newCatOrder = [...catMembers];
    const draggedItemContent = newCatOrder.splice(dragItem.current, 1)[0];
    newCatOrder.splice(dragOverItem.current, 0, draggedItemContent);

    // 3. Combine back and update the order property locally for immediate UI feedback
    const updatedFullList = [...otherMembers, ...newCatOrder].map(
      (item, index) => ({
        ...item,
        order: index,
      }),
    );

    setMembers(updatedFullList); // This forces the frontend to update immediately

    // 4. Update the backend
    const itemsToUpdate = updatedFullList.map((item) => ({
      _id: item._id,
      order: item.order,
    }));

    try {
      await membersAPI.reorder(itemsToUpdate);
      toast.success("Order updated!");
    } catch (err) {
      toast.error("Failed to save order");
      fetchMembers(); // Revert on failure
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("role", role);
    formData.append("description", description);
    formData.append("linkedin", linkedin);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await membersAPI.update(editingId, formData);
        toast.success("Member updated successfully");
      } else {
        await membersAPI.create(formData);
        toast.success("Member added successfully");
      }
      cancelMemberEdit();
      fetchMembers();
    } catch (error) {
      toast.error(editingId ? "Failed to update" : "Failed to add");
    }
  };

  const handleMemberDelete = async (id) => {
    if (window.confirm("Delete this member?")) {
      try {
        await membersAPI.delete(id);
        toast.success("Member deleted");
        fetchMembers();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const handleEditMember = (member) => {
    setEditingId(member._id);
    setName(member.name);
    setCategory(member.category);
    setRole(member.role || "");
    setDescription(member.description || "");
    setLinkedin(member.linkedin || "");
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelMemberEdit = () => {
    setEditingId(null);
    setName("");
    setCategory("trustee");
    setRole("");
    setDescription("");
    setLinkedin("");
    setImage(null);
    const fileInput = document.getElementById("memberFileInput");
    if (fileInput) fileInput.value = "";
  };

  // Logic to handle multiple sort types
  const sortedMembers =
    sortOrder === "manual"
      ? [...members].sort((a, b) => (a.order || 0) - (b.order || 0))
      : [...members].sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow mb-8 border-t-4 border-orange-500">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Member" : "Add New Member"}
        </h2>
        <form onSubmit={handleMemberSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <select
              className="border p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Role"
              className="border p-2 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <div className="flex flex-col justify-center">
              <input
                id="memberFileInput"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="border p-1 rounded text-sm"
              />
            </div>
            <input
              type="text"
              placeholder="Social Link"
              className="border p-2 rounded md:col-span-2"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
            >
              {editingId ? "Update Member" : "Add Member"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelMemberEdit}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Team Members</h2>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
        >
          <option value="manual">Manual Order (Drag & Drop)</option>
          <option value="newest">Newest Added</option>
          <option value="oldest">Oldest Added</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="space-y-8">
          {categories.map((cat) => {
            const catMembers = sortedMembers.filter(
              (m) => m.category === cat.id,
            );
            if (catMembers.length === 0) return null;
            return (
              <div key={cat.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4 text-orange-600 border-b pb-2 flex justify-between">
                  {cat.label}{" "}
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-500">
                    {catMembers.length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catMembers.map((member, index) => (
                    <div
                      key={member._id}
                      draggable={sortOrder === "manual"}
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnter={(e) => handleDragEnter(e, index)}
                      onDragEnd={() => handleDragEnd(cat.id)}
                      onDragOver={(e) => e.preventDefault()}
                      className={`border rounded p-4 flex gap-4 items-start hover:shadow-md transition bg-white ${sortOrder === "manual" ? "cursor-move" : ""}`}
                    >
                      {sortOrder === "manual" && (
                        <GripVertical
                          size={16}
                          className="text-gray-400 mt-1"
                        />
                      )}
                      <img
                        src={
                          member.image
                            ? `${IMAGE_BASE_URL}/${member.image}`
                            : "https://placehold.co/100"
                        }
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover bg-gray-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 truncate">
                          {member.name}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">
                          {member.role}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleEditMember(member)}
                            className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleMemberDelete(member._id)}
                            className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TeamManagement;
