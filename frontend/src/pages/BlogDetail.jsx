import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogsAPI } from "../services/api";
import { IMAGE_BASE_URL } from "../utils/constants";
import { ArrowLeft, User, Calendar } from "lucide-react";

const BlogDetail = () => {
  // const { id } = useParams();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await blogsAPI.getAll();
        const foundBlog = res.data.data.find((b) => b.slug === slug);
        setBlog(foundBlog);
      } catch (error) {
        console.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center -mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 -mt-20">
        <h2 className="text-2xl font-bold text-gray-800">Article not found</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="text-orange-500 hover:underline"
        >
          Back to Articles
        </button>
      </div>
    );

  const imageUrl = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `${IMAGE_BASE_URL}/${blog.image}`
    : "https://placehold.co/1200x600?text=No+Image";

  return (
    // FIX 1: Added overflow-x-hidden to prevent horizontal scrollbars
    <div className="min-h-screen bg-white -mt-20 overflow-x-hidden">
      {/* Hero Image */}
      <div className="w-full h-[300px] md:h-[500px] relative">
        <img
          src={imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 text-white max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4 md:mb-6 text-white/80 hover:text-white hover:bg-white/10 w-fit px-3 py-1 rounded-full transition-all text-sm md:text-base"
          >
            <ArrowLeft size={18} /> Back
          </button>
          {/* FIX 2: Added break-words and adjusted font sizes for mobile */}
          <h1 className="text-2xl md:text-5xl font-bold mb-4 leading-tight text-white drop-shadow-md break-words">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-base text-white/90">
            <span className="flex items-center gap-2">
              <User size={16} className="text-orange-400" />{" "}
              {blog.author || "Admin"}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-orange-400" />
              {new Date(blog.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Description / Summary */}
        <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500 mb-8 italic text-gray-700 text-base md:text-lg shadow-sm break-words">
          {blog.description}
        </div>

        {/* Main Content (Rich Text) */}
        {/* FIX 3: Added 'break-words', 'w-full', and specific img styling */}
        <div className="w-full max-w-full overflow-hidden">
          <div
            className="
              prose prose-sm md:prose-lg max-w-none w-full break-words
              prose-headings:text-[#0B0B45] prose-headings:font-bold prose-headings:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-orange-500 hover:prose-a:text-orange-600 
              
              /* FORCE IMAGES TO BE RESPONSIVE */
              prose-img:rounded-xl prose-img:shadow-md prose-img:my-8 prose-img:w-full prose-img:h-auto prose-img:object-cover
              
              prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
              prose-li:marker:text-orange-500
              prose-blockquote:border-l-orange-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4
            "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={() => navigate("/blog")}
            className="text-[#0B0B45] font-semibold hover:text-orange-500 transition-colors flex items-center gap-2 text-sm md:text-base cursor-pointer"
          >
            &larr; View all articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
