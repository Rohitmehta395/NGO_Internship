import React, { useEffect, useState, useRef } from "react";
import { blogsAPI } from "../../../services/api.js";
import { toast } from "react-toastify";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";
import BlogForm from "./BlogForm";
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  User,
  X,
  BookOpen,
  Link as LinkIcon,
  GripVertical,
} from "lucide-react";

const BlogManagement = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [sortOrder, setSortOrder] = useState("manual");

  // Drag and Drop Refs
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await blogsAPI.getAll();
      setBlogs(res.data.data);
    } catch (err) {
      toast.error("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  /* --- DRAG AND DROP HANDLERS --- */
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
    const _blogs = [...blogs];
    const draggedItemContent = _blogs.splice(dragItem.current, 1)[0];
    _blogs.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setBlogs(_blogs);

    const itemsToUpdate = _blogs.map((item, index) => ({
      _id: item._id,
      order: index,
    }));

    try {
      await blogsAPI.reorder(itemsToUpdate);
      toast.success("Order updated!");
    } catch (err) {
      toast.error("Failed to save order");
      fetchBlogs();
    }
  };

  const handleBlogSubmit = async (blogData) => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("content", blogData.content);
    formData.append("author", blogData.author);
    if (blogData.link) formData.append("link", blogData.link);
    if (blogData.image) formData.append("image", blogData.image);

    try {
      if (editingBlog) {
        await blogsAPI.update(editingBlog._id, formData);
        toast.success("Article updated successfully!");
        setEditingBlog(null);
      } else {
        await blogsAPI.create(formData);
        toast.success("New article published!");
      }
      setShowForm(false);
      fetchBlogs();
    } catch (error) {
      toast.error(editingBlog ? "Failed to update." : "Failed to publish.");
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelBlogEdit = () => {
    setEditingBlog(null);
    setShowForm(false);
  };

  const handleBlogDelete = async (id) => {
    try {
      await blogsAPI.delete(id);
      toast.success("Article deleted permanently.");
      setDeleteConfirmId(null);
      fetchBlogs();
    } catch (error) {
      toast.error("Could not delete article.");
    }
  };

  // Sort logic based on selection
  const sortedBlogs =
    sortOrder === "manual"
      ? blogs
      : [...blogs].sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

  return (
    <div className="space-y-6">
      {/* ACTION BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <button
          onClick={() => {
            setEditingBlog(null);
            setShowForm(!showForm);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm ${
            showForm
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {showForm ? (
            <>
              <X className="w-4 h-4" /> Cancel
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" /> Create New Article
            </>
          )}
        </button>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full sm:w-auto border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-orange-500/20"
        >
          <option value="manual">Manual Order (Drag & Drop)</option>
          <option value="newest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* FORM SECTION */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${showForm ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-white border border-orange-100 rounded-2xl shadow-sm p-6 mb-8 ring-4 ring-orange-50/50">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
            {editingBlog ? "Edit Article" : "Write New Article"}
          </h3>
          <BlogForm
            onSubmit={handleBlogSubmit}
            initialData={editingBlog}
            onCancel={cancelBlogEdit}
          />
        </div>
      </div>

      {/* BLOG GRID */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <p>Loading your articles...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBlogs.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
              <BookOpen className="w-12 h-12 mb-3 opacity-50" />
              <p className="font-medium">No articles published yet.</p>
            </div>
          ) : (
            sortedBlogs.map((blog, index) => (
              <div
                key={blog._id}
                draggable={sortOrder === "manual"}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full ${sortOrder === "manual" ? "cursor-move" : ""}`}
              >
                {/* IMAGE */}
                <div className="h-48 overflow-hidden relative bg-gray-100">
                  {sortOrder === "manual" && (
                    <div className="absolute top-2 right-2 z-10 bg-black/30 p-1.5 rounded text-white backdrop-blur-sm">
                      <GripVertical size={16} />
                    </div>
                  )}
                  <img
                    src={
                      blog.image
                        ? `${IMAGE_BASE_URL}/${blog.image}`
                        : "https://placehold.co/600x400?text=No+Image"
                    }
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />
                  {blog.link && (
                    <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-white flex items-center gap-1">
                      <LinkIcon className="w-3 h-3" /> LINK
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />{" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> {blog.author || "Admin"}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-orange-600">
                    {blog.title}
                  </h3>

                  <div
                    className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1"
                    dangerouslySetInnerHTML={{
                      __html: blog.description || blog.content,
                    }}
                  />

                  {/* ACTION FOOTER */}
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-2 mt-auto">
                    {deleteConfirmId === blog._id ? (
                      <div className="flex items-center gap-2 w-full bg-red-50 p-1 rounded-lg">
                        <span className="text-xs text-red-600 font-bold ml-2">
                          Sure?
                        </span>
                        <div className="flex ml-auto gap-1">
                          <button
                            onClick={() => handleBlogDelete(blog._id)}
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded-md"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-md"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Edit2 className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(blog._id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
