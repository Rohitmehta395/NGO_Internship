import React, { useEffect, useState } from "react";
import { sulabhAPI } from "../../../services/api";
import { API_BASE_URL } from "../../../utils/constants";

const CoreModules = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await sulabhAPI.getAll({ category: "core_module" });
        setModules(res.data);
      } catch (err) {
        console.error("Error fetching modules", err);
      }
    };
    fetchModules();
  }, []);

  return (
    <section className="w-full py-16 lg:py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-4 mb-12 lg:mb-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-0.5 bg-[#1D2130]"></div>
            <h3 className="font-roboto font-bold text-sm md:text-base text-primary-text uppercase tracking-widest">
              Sulabh app 2.0
            </h3>
          </div>

          <h2 className="font-roboto font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#0B0B45] max-w-3xl">
            Sulabh App 2.0 offers core modules:
          </h2>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <div
              key={module._id}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-[3/4] lg:aspect-[411/421] cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Background Image with Zoom Effect */}
              <img
                src={`${API_BASE_URL}${module.image}`}
                alt={module.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                <h3 className="font-roboto font-bold text-2xl lg:text-3xl leading-snug text-white mb-4 drop-shadow-md">
                  {module.title}
                </h3>
                <p className="font-roboto text-base lg:text-lg leading-relaxed text-white/90">
                  {module.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreModules;
