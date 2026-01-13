import { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../../../utils/constants";
import { mediaAPI } from "../../../services/api.js";

const MediaTestimonial = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH MEDIA FROM BACKEND ================= */
  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const res = await mediaAPI.getAll();
        setMediaItems(res.data || []);
      } catch (err) {
        console.error("Failed to fetch media:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  /* ================= ANIMATION ON SCROLL ================= */
  useEffect(() => {
    const cards = document.querySelectorAll(".media-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [mediaItems]);

  /* ================= UI ================= */
  if (loading) return <div className="text-center py-20">Loading media...</div>;
  if (mediaItems.length === 0)
    return <div className="text-center py-20 text-gray-500">No media found.</div>;

  const getFullImageUrl = (imageUrl) =>
    imageUrl
      ? `${IMAGE_BASE_URL}/uploads/${
          imageUrl.startsWith("media/") ? imageUrl : `media/${imageUrl}`
        }`
      : "https://placehold.co/600x400?text=No+Image";

  return (
    <section className="w-full bg-[#fafafa] overflow-x-hidden px-4 py-12 font-[Poppins]">
      <h2 className="text-center font-[Quicksand] font-bold text-[#ED9121] text-2xl md:text-4xl mb-10">
        Media Coverage
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {mediaItems.map((item, i) => (
          <article
            key={item._id || i}
            className="media-card bg-white rounded-xl overflow-hidden
                       shadow-md transition-all duration-300
                       opacity-0 translate-y-8
                       hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={getFullImageUrl(item.image)}
              alt={item.title || item.alt}
              className="w-full aspect-video object-cover"
            />

            <div className="p-5 flex flex-col h-full">
              <p className="text-sm font-semibold text-[#ED9121] mb-1">
                {item.source}
              </p>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {item.description}
              </p>

              <p className="text-xs text-gray-400 mb-3">{item.date}</p>

              <a
                href={item.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-sm font-semibold text-[#ED9121] hover:text-[#c96f11]"
              >
                View Article →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MediaTestimonial;
