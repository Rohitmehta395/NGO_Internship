import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogsAPI } from "../services/api";
import { IMAGE_BASE_URL } from "../utils/constants";
import { ArrowLeft, User, Calendar } from "lucide-react";
import DOMPurify from "dompurify";

const BlogDetail = () => {
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
        console.error("Failed to load blog", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Article not found</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="text-orange-500 font-semibold hover:underline"
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
    <div className="min-h-screen bg-white overflow-x-hidden w-full -mt-20">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[500px]">
        <img
          src={imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16 max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 mb-4 md:mb-6 text-white/80 hover:text-white transition-colors"
          >
            <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <ArrowLeft size={18} />
            </div>
            <span className="text-sm md:text-base">Back</span>
          </button>

          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg break-words w-full">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-white/90 font-medium">
            <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
              <User size={14} className="text-orange-400" />
              {blog.author || "Admin"}
            </span>
            <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
              <Calendar size={14} className="text-orange-400" />
              {new Date(blog.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-5 md:px-10 py-10 md:py-16">
        {/* Description */}
        {blog.description && (
          <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500 mb-10 w-full">
            <p className="text-base md:text-xl text-gray-700 italic font-serif leading-relaxed break-words">
              {blog.description}
            </p>
          </div>
        )}

        <article className="w-full max-w-none min-w-0 overflow-hidden">
          <div
            className="
              prose prose-sm sm:prose-base md:prose-md lg:prose-lg 
              w-full max-w-none 
              
              /* HYPHENATION RULES */
              hyphens-auto           /* Adds the actual hyphen (-) character */
              whitespace-normal 
              wrap-break-word            /* Fallback: Breaks words if they are too long for the screen */
              
              /* TYPOGRAPHY STYLES */
              prose-headings:font-bold prose-headings:text-[#0B0B45] prose-headings:leading-tight
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-orange-600 prose-a:break-all hover:prose-a:underline
              
              /* IMAGES */
              prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full prose-img:max-w-full prose-img:h-auto prose-img:object-cover
              
              /* QUOTES & CODE */
              prose-blockquote:border-l-orange-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4
              prose-pre:overflow-x-auto prose-pre:max-w-[85vw]
            "
            // Inline styles for broader browser support
            style={{
              hyphens: "auto",
              WebkitHyphens: "auto",
              msHyphens: "auto",
              wordWrap: "break-word",
              overflowWrap: "anywhere",
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content),
            }}
          />
        </article>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <button
            onClick={() => navigate("/blogs")}
            className="flex items-center gap-2 text-[#0B0B45] font-semibold hover:text-orange-600 transition-colors"
          >
            <ArrowLeft size={20} />
            See all articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
