import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { programsAPI } from "../services/api";
import { API_BASE_URL } from "../utils/constants";
import { ProgramCard } from "../components/common/cards/ProgramCard";

const DynamicProgram = () => {
  const { slug } = useParams();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [programTitle, setProgramTitle] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await programsAPI.getAll();
        const allPrograms = res.data.data;

        const parentProgram = allPrograms.find(
          (p) => p.category === "main" && p.slug === slug,
        );

        if (parentProgram) {
          setProgramTitle(parentProgram.title);
        } else {
          setProgramTitle(slug.replace(/-/g, " "));
        }

        const pageContent = allPrograms.filter((p) => p.category === slug);
        setContent(pageContent);
      } catch (error) {
        console.error("Error fetching program details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-orange-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* --- HEADER --- */}
        <div className="mb-12 text-center md:text-left">
          <Link
            to="/programs"
            className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors mb-6 group"
          >
            <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-2 shadow-sm group-hover:border-orange-200 group-hover:bg-orange-50 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
            Back to All Programs
          </Link>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 capitalize tracking-tight mb-2">
            {programTitle}
          </h1>
          <div className="h-1.5 w-24 bg-orange-500 rounded-full mt-4 mx-auto md:mx-0"></div>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="flex flex-col gap-12">
          {content.length > 0 ? (
            content.map((item, index) => (
              <ProgramCard
                key={item._id}
                index={index}
                type={item.type}
                // Pass the full source as videoUrl
                videoUrl={item.source}
                image={
                  item.type === "image" && !item.source.startsWith("http")
                    ? `${API_BASE_URL}/${item.source}`
                    : item.source
                }
                videoId={
                  item.type === "video" ? item.source.split("/").pop() : null
                }
                title={item.title}
                description={item.description}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
              <div className="p-4 bg-gray-50 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No content yet
              </h3>
              <p className="text-gray-500 mt-1">
                Add content via the Admin Dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicProgram;
