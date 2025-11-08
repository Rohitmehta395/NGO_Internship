import React from "react";
import image1 from "../../assets/sulabhapp.webp"; // your image
import OrangeButton from "../common/buttons/OrangeButton";
import FlagshipCard from "../common/cards/FlagshipCard";
import CircleStat from "../common/cards/CircleStat";
import { DollarSign, Gift, User, Users } from "lucide-react";

export default function FlagshipPrograms() {
  const stats = [
    {
      number: "500+",
      label: "Total Happy Children",
      icon: <User />,
    },
    {
      number: "110+",
      label: "Total Our Volunteer",
      icon: <Users />,
    },
    {
      number: "210+",
      label: "Our Products & Gifts",
      icon: <Gift />,
    },
    {
      number: "560+",
      label: "Worldwide Donor",
      icon: <DollarSign />,
    },
  ];

  const programs = new Array(4).fill(0).map((_, i) => ({
    image: image1,
    title: "Sulabh App 2.0",
    date: "14th June 2025",
    location: "GMPS Sathanuru",
  }));

  return (
    <section className="relative bg-[#0a2540] py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* --- Top Row: Circles + Heading + Button --- */}
        <div className="flex flex-wrap justify-between items-center gap-6 mb-16">
          {/* Circles */}
          <div className="flex-1 flex flex-wrap gap-8 justify-center md:justify-start">
            {stats.map((s, i) => (
              <CircleStat key={i} {...s} />
            ))}
          </div>

          {/* Heading + Orange Button */}
          <div className="flex flex-col items-end gap-4 text-right">
            <h2 className="text-white text-2xl md:text-3xl font-semibold flex items-center gap-2">
              <span className="text-[#E57C23] text-2xl">♡</span>
              Know More About Our Flagship Programs
            </h2>
            <OrangeButton work="Explore More" />
          </div>
        </div>

        {/* --- Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {programs.map((p, idx) => (
            <FlagshipCard
              key={idx}
              image={p.image}
              title={p.title}
              date={p.date}
              location={p.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
