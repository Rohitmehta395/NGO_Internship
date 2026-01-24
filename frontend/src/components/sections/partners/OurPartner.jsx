import { useEffect, useState } from "react";
import { partnersAPI } from "../../../services/api";
import { IMAGE_BASE_URL } from "../../../utils/constants";
import { Handshake, X } from "lucide-react";

const OurPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await partnersAPI.getAll();
        setPartners(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch partners", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedPartner(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (selectedPartner) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedPartner]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-[#ED9121] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!partners.length) return null;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white px-5 py-20 font-[Poppins]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full text-[#ED9121] font-semibold text-sm tracking-wide uppercase">
            <Handshake className="w-4 h-4" />
            Our Network
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#082D50] font-[Quicksand]">
            Collaboration that Fuels Impact
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We are proud to work with these incredible organizations to make a
            difference.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => {
            const imageSrc = partner.imageUrl?.startsWith("http")
              ? partner.imageUrl
              : `${IMAGE_BASE_URL}/uploads/${partner.imageUrl}`;

            return (
              <div
                key={partner._id}
                onClick={() => setSelectedPartner(partner)} // <--- Click Trigger
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer"
              >
                {/* Image Container */}
                <div className="h-64 overflow-hidden relative bg-gray-100">
                  <div className="absolute inset-0 bg-[#082D50]/0 group-hover:bg-[#082D50]/10 transition-colors z-10" />
                  <img
                    src={imageSrc}
                    alt={partner.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/800x400?text=Partner";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#ED9121] to-orange-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                </div>

                {/* Content Preview */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-[#082D50] mb-3 group-hover:text-[#ED9121] transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-4 flex-1">
                    {partner.description}
                  </p>
                  <span className="text-[#ED9121] text-xs font-semibold mt-4 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Read More &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MODAL OVERLAY ================= */}
      {selectedPartner && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedPartner(null)} // Close on background click
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent close on card click
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPartner(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition shadow-sm border border-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Image */}
            <div className="h-64 sm:h-80 w-full relative bg-gray-100">
              <img
                src={
                  selectedPartner.imageUrl?.startsWith("http")
                    ? selectedPartner.imageUrl
                    : `${IMAGE_BASE_URL}/uploads/${selectedPartner.imageUrl}`
                }
                alt={selectedPartner.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/800x400?text=Partner";
                }}
              />
            </div>

            {/* Modal Content */}
            <div className="p-8 sm:p-10 space-y-4">
              <h2 className="text-3xl font-bold text-[#082D50] font-[Quicksand]">
                {selectedPartner.name}
              </h2>

              <div className="h-1 w-20 bg-[#ED9121] rounded-full" />

              <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                {selectedPartner.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OurPartners;
