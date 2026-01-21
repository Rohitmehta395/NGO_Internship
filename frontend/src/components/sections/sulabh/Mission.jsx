import React, { useEffect, useState } from "react";
import { sulabhAPI } from "../../../services/api";
import { API_BASE_URL } from "../../../utils/constants";

const Mission = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        // Fetch without sort to respect the Custom Order (default backend sort)
        const res = await sulabhAPI.getAll({ category: "mission" });
        setMissions(res.data);
      } catch (err) {
        console.error("Error fetching missions", err);
      }
    };
    fetchMissions();
  }, []);

  if (missions.length === 0) return null;

  return (
    <section className="w-full bg-white">
      {missions.map((mission, index) => {
        const isImageRight = index % 2 === 0;

        return (
          // Line removed (no border-b)
          <div
            key={mission._id}
            className="px-6 md:px-12 lg:px-20 py-16 lg:py-24"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
                {/* Text Content */}
                <div
                  className={`flex flex-col justify-center order-2 ${isImageRight ? "lg:order-1" : "lg:order-2"}`}
                >
                  <h2 className="font-inter font-extrabold text-4xl lg:text-5xl leading-tight text-[#0B0B45] mb-8">
                    {mission.title}
                  </h2>
                  <div className="space-y-6 mb-10 text-justify hyphens-auto">
                    <p className="font-roboto text-base lg:text-md text-[#525560] leading-relaxed whitespace-pre-line">
                      {mission.description}
                    </p>
                  </div>
                  {mission.learnMoreLink && (
                    <div className="flex justify-start">
                      <a
                        href={mission.learnMoreLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-inter font-semibold text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                          Learn more
                        </button>
                      </a>
                    </div>
                  )}
                </div>

                {/* Media Content */}
                <div
                  className={`order-1 ${isImageRight ? "lg:order-2" : "lg:order-1"}`}
                >
                  <a
                    href={mission.videoLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={`block relative group w-full aspect-[4/5] lg:aspect-square max-h-[500px] mx-auto rounded-2xl overflow-hidden shadow-xl ${!mission.videoLink ? "cursor-default pointer-events-none" : ""}`}
                    onClick={(e) => !mission.videoLink && e.preventDefault()}
                  >
                    <img
                      src={`${API_BASE_URL}${mission.image}`}
                      alt={mission.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {mission.videoLink && (
                      <>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                            <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                              <svg
                                className="w-6 h-6 ml-1 text-[#1D2130]"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M8 5.14v13.72L19 12L8 5.14z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Mission;
