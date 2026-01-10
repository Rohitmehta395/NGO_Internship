import React, { useEffect, useState } from "react";
import { membersAPI, blogsAPI } from "../../services/api";
import { toast } from "react-toastify";
import { IMAGE_BASE_URL } from "../../utils/constants";
import BlogForm from "./BlogForm";
import EducationImageManager from "./EducationImageManager";
import EventsAdmin from "./eventsAdmin";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("members");

  // --- MEMBER STATE ---
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Member Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("trustee");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // --- BLOG STATE ---
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  const categories = [
    { id: "guiding-spirit", label: "Guiding Spirit" },
    { id: "trustee", label: "Trustees (Karyakartas)" },
    { id: "advisor", label: "Advisory Board (MargaDarshaks)" },
    { id: "patron", label: "Patrons" },
    { id: "volunteer", label: "Volunteers" },
  ];

  // --- FETCH DATA ---
  useEffect(() => {
    // Only fetch data relevant to the active tab
    if (activeTab === "blogs") {
      fetchBlogs();
    } else if (activeTab === "members") {
      fetchMembers();
    }
    // Note: Education images fetch themselves inside their own component
  }, [activeTab]);

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

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await blogsAPI.getAll();
      setBlogs(res.data.data);
    } catch (err) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  // --- MEMBER HANDLERS ---
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

  // --- BLOG HANDLERS ---
  const handleBlogSubmit = async (blogData) => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("content", blogData.content);
    formData.append("author", blogData.author);

    if (blogData.image) {
      formData.append("image", blogData.image);
    }

    try {
      if (editingBlog) {
        await blogsAPI.update(editingBlog._id, formData);
        toast.success("Blog updated successfully!");
        setEditingBlog(null);
      } else {
        await blogsAPI.create(formData);
        toast.success("Blog published successfully!");
      }
      fetchBlogs();
    } catch (error) {
      toast.error(
        editingBlog ? "Failed to update blog" : "Failed to publish blog"
      );
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelBlogEdit = () => {
    setEditingBlog(null);
  };

  const handleBlogDelete = async (id) => {
    if (window.confirm("Delete this article?")) {
      try {
        await blogsAPI.delete(id);
        toast.success("Blog deleted");
        fetchBlogs();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/admin/login";
            }}
            className="text-red-500 font-medium hover:underline bg-white px-4 py-2 rounded shadow-sm"
          >
            Logout
          </button>
        </div>

        {/* TABS (Updated with Education Images) */}
        <div className="flex gap-4 mb-6 border-b border-gray-300 overflow-x-auto">
          <button
            className={`pb-2 px-4 font-bold text-lg transition-colors whitespace-nowrap ${
              activeTab === "members"
                ? "border-b-4 border-orange-500 text-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("members")}
          >
            Team Management
          </button>
          <button
            className={`pb-2 px-4 font-bold text-lg transition-colors whitespace-nowrap ${
              activeTab === "blogs"
                ? "border-b-4 border-orange-500 text-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("blogs")}
          >
            Blog Management
          </button>
          {/* 2. NEW TAB BUTTON */}
          <button
            className={`pb-2 px-4 font-bold text-lg transition-colors whitespace-nowrap ${
              activeTab === "education-images"
                ? "border-b-4 border-orange-500 text-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("education-images")}
          >
            Education Images
          </button>

           {/* 2. NEW Event BUTTON */}
          
          <button
        className={`pb-2 px-4 font-bold text-lg transition-colors whitespace-nowrap ${
        activeTab === "events"
          ? "border-b-4 border-orange-500 text-orange-600"
          : "text-gray-500 hover:text-gray-700"
          }`}
         onClick={() => setActiveTab("events")}
           >
          Events
          </button>
        </div>

        {/* ================= MEMBERS TAB ================= */}
        {activeTab === "members" && (
          <>
            {/* Member Form */}
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
                    placeholder="Role (e.g. Managing Trustee)"
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
                    {editingId && !image && (
                      <span className="text-xs text-gray-500 mt-1">
                        Leave empty to keep current
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Social Link (Optional)"
                    className="border p-2 rounded md:col-span-2"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
                <textarea
                  placeholder="Description (Optional)"
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
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Member List */}
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="space-y-8">
                {categories.map((cat) => {
                  const catMembers = members.filter(
                    (m) => m.category === cat.id
                  );
                  if (catMembers.length === 0) return null;
                  return (
                    <div
                      key={cat.id}
                      className="bg-white p-6 rounded-lg shadow"
                    >
                      <h3 className="text-xl font-bold mb-4 text-orange-600 border-b pb-2 flex justify-between">
                        {cat.label}{" "}
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-500">
                          {catMembers.length}
                        </span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {catMembers.map((member) => (
                          <div
                            key={member._id}
                            className="border rounded p-4 flex gap-4 items-start hover:shadow-md transition"
                          >
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
                                  className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleMemberDelete(member._id)}
                                  className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100"
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
        )}

        {/* ================= BLOGS TAB ================= */}
        {activeTab === "blogs" && (
          <div className="animate-fade-in space-y-8">
            <div>
              <BlogForm
                onSubmit={handleBlogSubmit}
                initialData={editingBlog}
                onCancel={cancelBlogEdit}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="hidden sm:block w-1.5 h-8 bg-orange-500 rounded-full"></span>
                Published Articles
              </h2>

              {loading ? (
                <div className="flex justify-center py-12 text-gray-500">
                  Loading articles...
                </div>
              ) : (
                <div className="space-y-4">
                  {blogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300 text-gray-500">
                      <p className="font-medium">No articles published yet.</p>
                      <p className="text-sm">
                        Use the form above to write your first post.
                      </p>
                    </div>
                  ) : (
                    blogs.map((blog) => (
                      <div
                        key={blog._id}
                        className={`group bg-white p-4 sm:p-5 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start sm:items-center ${
                          editingBlog?._id === blog._id
                            ? "border-blue-400 ring-2 ring-blue-100"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="w-full sm:w-48 h-48 sm:h-32 shrink-0 overflow-hidden rounded-lg bg-gray-100 relative">
                          <img
                            src={
                              blog.image
                                ? `${IMAGE_BASE_URL}/${blog.image}`
                                : "https://placehold.co/600x400?text=No+Image"
                            }
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src =
                                "https://placehold.co/150?text=No+Img";
                            }}
                          />
                        </div>

                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col gap-1 mb-2">
                            <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                              {blog.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-3 text-xs text-gray-500 font-medium uppercase tracking-wide">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                                {blog.author || "Admin"}
                              </span>
                              <span>•</span>
                              <span>
                                {new Date(blog.createdAt).toLocaleDateString(
                                  undefined,
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                          <div
                            className="text-sm text-gray-600 line-clamp-2 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                          />
                        </div>

                        <div className="w-full sm:w-auto flex sm:flex-col justify-end sm:items-end gap-2 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-blue-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleBlogDelete(blog._id)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 3. NEW EDUCATION IMAGES TAB ================= */}
        {activeTab === "education-images" && (
          <div className="animate-fade-in">
            <EducationImageManager />
          </div>
        )}

        {/* ================= 4. NEW EVENTS TAB ================= */}
        
         {activeTab === "events" && (
         <div className="animate-fade-in">
            <EventsAdmin />
          </div>
     )}
      </div>
    </div>
  );
};

export default Dashboard;
