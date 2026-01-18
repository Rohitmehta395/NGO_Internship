import React, { useEffect, useState } from "react";
import { programsAPI } from "../../../services/api";
import { API_BASE_URL } from "../../../utils/constants";
import { CardGlass } from "../../common/cards/ProgramCard";

const SharadaAcademyPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await programsAPI.getAll();
        // Filter specifically for this section
        const sectionData = res.data.data.filter(
          (p) => p.category === "sharadaAcademy",
        );
        setPrograms(sectionData);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading Programs...</div>;

  return (
    <div className="grid grid-cols-1 gap-6 p-4">
      {programs.length > 0 ? (
        programs.map((p, idx) => (
          <CardGlass
            key={p._id || idx}
            type={p.type}
            image={
              p.type === "image" && !p.source.startsWith("http")
                ? `${API_BASE_URL}/${p.source}`
                : p.source
            }
            videoId={p.type === "video" ? p.source.split("/").pop() : null}
            title={p.title}
            description={p.description}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 italic">
          No programs found for Sharada Academy.
        </p>
      )}
    </div>
  );
};

export default SharadaAcademyPrograms;
