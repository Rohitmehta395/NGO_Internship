import React from "react";
import CircleStat from "../../common/cards/CircleStat";
import { DollarSign, Gift, User, Users } from "lucide-react";
import OrangeButton from "../../common/buttons/OrangeButton";
import FlagshipCard from "../../common/cards/FlagshipCard";

import sharada from "../../../assets/home/FlagshipPrograms_images/sharada.webp";
import image1 from "../../../assets/sulabhapp.webp";

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

  const programs = [
    {
      image: sharada,
      title: "Sharada Academy",
      desc: "A structured learning initiative that supports after-school academics.",
    },
    {
      image: image1,
      title: "Project Sulabh",
      desc: "An ed-tech and community empowerment programme: online spoken English and soft-skills courses. ",
    },
    {
      image: image1,
      title: "Project JnanaShala",
      desc: "A school-support programme that provides library kits, digital learning tools, etc.",
    },
    {
      image: image1,
      title: "Others",
      desc: "Many other programmes which help the students grow.",
    },
  ];

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
            <OrangeButton work="Explore More" path="/programs" />
          </div>
        </div>

        {/* --- Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {programs.map((p, idx) => (
            <FlagshipCard
              key={idx}
              image={p.image}
              title={p.title}
              desc={p.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
