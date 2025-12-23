import React, { useState, useEffect } from "react";
import { blogsAPI } from "../../../services/api.js";
import { IMAGE_BASE_URL } from "../../../utils/constants.js";
import ArticleCard from "../../common/cards/ArticleCard.jsx";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogsAPI.getAll();
        setBlogs(res.data.data);
      } catch (error) {
        console.error("Failed to load blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-2xl font-light text-[#0B0B45] mb-4">
            <span className="text-orange-500">
              Stay updated with our latest news, success stories, and
              educational insights.
            </span>
          </h1>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 text-xl">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              // Parse Date
              const dateObj = new Date(blog.createdAt);
              const date = dateObj.getDate();
              const month = dateObj.toLocaleString("default", {
                month: "short",
              });

              // Image URL
              const imageUrl = blog.image
                ? blog.image.startsWith("http")
                  ? blog.image
                  : `${IMAGE_BASE_URL}/${blog.image}`
                : "https://placehold.co/600x400?text=No+Image";

              return (
                <div
                  key={blog._id}
                  className="h-full cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                >
                  <ArticleCard
                    date={date}
                    month={month}
                    image={imageUrl}
                    author={blog.author || "Admin"}
                    title={blog.title}
                    desc={blog.description}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
