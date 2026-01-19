import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../utils/constants";

export default function AllPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/programs`);
        // Filter ONLY programs meant for the Main Page
        const mainPrograms = res.data.data.filter((p) => p.category === "main");
        setPrograms(mainPrograms);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // ADDED: Helper to convert YouTube URL to Embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";
    // Regular expression to extract Video ID from various YouTube URL formats
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    // If ID found, return embed URL, otherwise return original
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  if (loading)
    return (
      <div className="text-center py-24 text-gray-500">Loading Programs...</div>
    );

  return (
    <section
      className="bg-gray-50 py-12 px-4 sm:py-16 lg:py-24"
      id="next-section"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {programs.map((program) => (
            <div
              key={program._id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden sm:h-64 lg:h-72">
                {program.type === "video" ? (
                  // CHANGED: Use getEmbedUrl helper and allowFullScreen
                  <iframe
                    src={getEmbedUrl(program.source)}
                    title={program.title}
                    className="h-full w-full object-cover"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={
                      program.source.startsWith("http")
                        ? program.source
                        : `${API_BASE_URL}/${program.source}`
                    }
                    alt={program.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {/* Only show hover overlay for images, not videos (interferes with play button) */}
                {program.type !== "video" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                )}
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="mb-3 text-2xl font-bold leading-tight text-[#0B0B45] font-sans">
                  {program.title}
                </h3>
                <p className="mb-6 flex-grow text-base leading-relaxed text-gray-600 font-sans">
                  {program.description}
                </p>

                <Link
                  to={
                    program.slug
                      ? `/programs/${program.slug}`
                      : program.route || "#"
                  }
                  className="mt-auto block w-full"
                >
                  <button className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-orange-400 px-6 py-4 font-bold uppercase text-white transition-all hover:bg-orange-500 active:scale-95 cursor-pointer">
                    View Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
