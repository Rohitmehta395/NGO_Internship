import { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../../../utils/constants";
import { mediaAPI } from "../../../services/api.js";
import { Newspaper, Calendar } from "lucide-react";

const MediaTestimonial = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
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

  const getFullImageUrl = (imageUrl) =>
    imageUrl
      ? `${IMAGE_BASE_URL}/uploads/${
          imageUrl.startsWith("media/") ? imageUrl : `media/${imageUrl}`
        }`
      : "https://placehold.co/600x400?text=News+Article";

  if (loading) return null;
  if (mediaItems.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#ED9121] font-bold tracking-wider uppercase text-xs md:text-sm">
            In The News
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#082D50] mt-2 md:mt-3 font-[Quicksand]">
            Media Coverage
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {mediaItems.map((item, i) => (
            <article
              key={item._id || i}
              className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 h-full"
            >
              {/* Image Side */}
              <div className="w-full md:w-2/5 relative overflow-hidden h-52 md:h-auto shrink-0">
                <div className="absolute top-4 left-4 z-10 bg-[#ED9121] text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  MEDIA
                </div>
                <img
                  src={getFullImageUrl(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <Newspaper className="w-4 h-4" />
                    <span className="font-semibold text-gray-600 uppercase tracking-wide text-xs">
                      {item.source}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-[#082D50] mb-3 leading-tight group-hover:text-[#ED9121] transition-colors">
                    {item.description && item.description.length > 60
                      ? item.description.slice(0, 60) + "..."
                      : "Media Feature Story"}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                  <span className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.date).toLocaleDateString()}
                  </span>

                  <a
                    href={item.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[#ED9121] hover:underline flex items-center gap-1"
                  >
                    Read Article &rarr;
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaTestimonial;
