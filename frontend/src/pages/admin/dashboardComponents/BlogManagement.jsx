import React, { useEffect, useState } from "react";
import { blogsAPI } from "../../../services/api.js";
import { toast } from "react-toastify";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";
import BlogForm from "./BlogForm";

const BlogManagement = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    fetchBlogs();
  }, []);

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
        editingBlog ? "Failed to update blog" : "Failed to publish blog",
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

  const sortedBlogs = [...blogs].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <BlogForm
          onSubmit={handleBlogSubmit}
          initialData={editingBlog}
          onCancel={cancelBlogEdit}
        />
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="hidden sm:block w-1.5 h-8 bg-orange-500 rounded-full"></span>
            Published Articles
          </h2>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12 text-gray-500">
            Loading articles...
          </div>
        ) : (
          <div className="space-y-4">
            {sortedBlogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300 text-gray-500">
                <p className="font-medium">No articles published yet.</p>
                <p className="text-sm">
                  Use the form above to write your first post.
                </p>
              </div>
            ) : (
              sortedBlogs.map((blog) => (
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
                        e.target.src = "https://placehold.co/150?text=No+Img";
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
                            },
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
  );
};

export default BlogManagement;
