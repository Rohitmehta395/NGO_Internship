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
    <section className="relative bg-[#0a2540] py-12 px-4 md:py-16 md:px-8 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* --- Top Section --- */}
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10 lg:gap-6 mb-12 lg:mb-16">
          {/* Stats Container
              - Mobile/Tablet: 'grid grid-cols-2' 
                (Keeps the 2-per-row layout for small devices).
              - Desktop (lg): 'lg:flex lg:flex-wrap lg:justify-start lg:gap-8' 
                (Restores your original code's Flex behavior for Desktop).
          */}
          <div className="w-full lg:flex-1 grid grid-cols-2 justify-items-center gap-6 lg:flex lg:flex-wrap lg:gap-8 lg:justify-start lg:w-auto">
            {stats.map((s, i) => (
              <CircleStat key={i} {...s} />
            ))}
          </div>

          {/* Heading + Button Container */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end text-center lg:text-right gap-4">
            <h2 className="text-white text-2xl md:text-3xl font-semibold flex flex-col md:flex-row items-center gap-2">
              <span className="text-[#E57C23] text-3xl md:text-2xl">♡</span>
              Know More About Our Flagship Programs
            </h2>
            <div className="mt-2">
              <OrangeButton work="Explore More" path="/programs" />
            </div>
          </div>
        </div>

        {/* --- Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
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
