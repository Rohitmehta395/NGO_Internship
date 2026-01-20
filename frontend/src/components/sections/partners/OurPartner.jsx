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

        const activePartners = (res.data.data || [])
          .filter((p) => p.isActive)
          .sort((a, b) => (a.order || 0) - (b.order || 0));

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

  /* ================= RENDER ================= */
  return (
    <section className="bg-[#f9fafb] px-5 py-16 text-[#082D50]">
      <h2 className="mb-2 text-center text-2xl font-bold">Our Partners</h2>

      <p className="mb-10 text-center text-[#ED9121]">
        Collaboration that fuels impact
      </p>

      <div className="relative mx-auto max-w-[850px]">
        {/* CARD */}
        <div className="overflow-hidden rounded-xl bg-white border">
          <img
            src={imageSrc}
            alt={partner.name}
            className="h-[240px] w-full object-cover md:h-[300px]"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/800x400?text=Image+Not+Found";
            }}
          />

          <div className="p-6">
            <h3 className="mb-3 text-lg font-semibold md:text-xl">
              {partner.name}
            </h3>

            <p className="text-sm leading-relaxed text-gray-700 md:text-base">
              {partner.description}
            </p>
          </div>
        </div>

        {/* LEFT BUTTON */}
        {partners.length > 1 && (
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#ED9121] text-white flex items-center justify-center md:left-[-20px] z-10"
          >
            &#8249;
          </button>
        )}

        {/* RIGHT BUTTON */}
        {partners.length > 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#ED9121] text-white flex items-center justify-center md:right-[-20px] z-10"
          >
            &#8250;
          </button>
        )}
      </div>
    </section>
  );
};

export default OurPartners;
