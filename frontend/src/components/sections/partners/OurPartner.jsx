import { useEffect, useState } from "react";
import { partnersAPI } from "../../../services/api";
import { IMAGE_BASE_URL } from "../../../utils/constants";

const OurPartners = () => {
  const [partners, setPartners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // FETCH PARTNER
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await partnersAPI.getAll();

        const activePartners = (res.data.data || []).filter((p) => p.isActive);

        // Sort by createdAt descending (newest first)
        activePartners.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPartners(activePartners);
      } catch (err) {
        console.error("Failed to fetch partners", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // slider
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? partners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === partners.length - 1 ? 0 : prev + 1));
  };

  // STATES
  if (loading) {
    return (
      <section className="py-16 text-center text-gray-500">
        Loading partners...
      </section>
    );
  }

  if (!partners.length) return null;

  const partner = partners[current];

  const imageSrc = partner.imageUrl?.startsWith("http")
    ? partner.imageUrl
    : `${IMAGE_BASE_URL}/uploads/${partner.imageUrl}`;


  return (
    <section className="bg-[#f9fafb] px-5 py-16 text-[#082D50]">
      

      <p className="mb-12 text-center text-[#ED9121] font-semibold tracking-wide">
        Collaboration that fuels impact
      </p>

      <div className="relative mx-auto max-w-[850px]">
        {/* CARD */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <img
            src={imageSrc}
            alt={partner.name}
            className="h-[260px] w-full object-cover md:h-[320px] rounded-t-2xl"
            onError={(e) => {
              e.target.src = "https://placehold.co/800x400?text=Image+Not+Found";
            }}
          />

          <div className="p-6">
            <h3 className="mb-3 text-xl font-semibold text-gray-900 md:text-xl">
              {partner.name}
            </h3>

            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              {partner.description}
            </p>
          </div>
        </div>

        {/* LEFT BUTTON */}
        {partners.length > 1 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#ED9121] text-white flex items-center justify-center shadow-lg hover:bg-orange-500 transition-colors md:left-[-25px] z-20"
          >
            &#8249;
          </button>
        )}

        {/* RIGHT BUTTON */}
        {partners.length > 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#ED9121] text-white flex items-center justify-center shadow-lg hover:bg-orange-500 transition-colors md:right-[-25px] z-20"
          >
            &#8250;
          </button>
        )}
      </div>

      {/* Dots */}
      {partners.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {partners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === idx ? "bg-[#ED9121] w-4 h-4" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default OurPartners;
