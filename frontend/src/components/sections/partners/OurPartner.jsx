import { useEffect, useState } from "react";
import { partnersAPI } from "../../../services/api";
import { IMAGE_BASE_URL } from "../../../utils/constants";
import { Handshake, ExternalLink } from "lucide-react";

const OurPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await partnersAPI.getAll();
        const activePartners = (res.data.data || []).filter((p) => p.isActive);
        // Sort by newest
        activePartners.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setPartners(activePartners);
      } catch (err) {
        console.error("Failed to fetch partners", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

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

        {/* Modern Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => {
            const imageSrc = partner.imageUrl?.startsWith("http")
              ? partner.imageUrl
              : `${IMAGE_BASE_URL}/uploads/${partner.imageUrl}`;

            return (
              <div
                key={partner._id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Container with Overlay Effect */}
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
                  {/* Decorative Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#ED9121] to-orange-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-[#082D50] mb-3 group-hover:text-[#ED9121] transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-4 mb-6 flex-1">
                    {partner.description}
                  </p>

                  {/* <div className="flex items-center text-[#ED9121] font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Partner Organization</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
