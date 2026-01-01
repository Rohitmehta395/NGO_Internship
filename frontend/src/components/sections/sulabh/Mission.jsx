import React from "react";
import sulabhApp from "../../../assets/home/FlagshipPrograms_images/sulabhapp.webp";

const Mission = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Header Tag */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-0.5 bg-[#1D2130]"></div>
              <span className="font-inter font-bold text-sm tracking-widest uppercase text-[#0B0B45]">
                Know more
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-inter font-extrabold text-4xl lg:text-5xl leading-tight text-[#0B0B45] mb-8">
              Sulabh App 2.0!
            </h2>

            {/* Description Text */}
            <div className="space-y-6 mb-10 text-justify hyphens-auto">
              <p className="font-roboto text-base lg:text-md text-[#525560] leading-relaxed">
                Designed to empower learners and educators in rural and
                underserved communities, the Web-based App offers accessible,
                self-paced courses in Spoken English, Financial Literacy,
                General Knowledge, Soft Skills, and more.
              </p>
              <p className="font-roboto text-base lg:text-md text-[#525560] leading-relaxed">
                <span className="font-bold text-[#0B0B45]">
                  Sharada Educational Trust
                </span>{" "}
                is on a mission to bridge the digital divide and dismantle
                educational barriers, empowering learners in rural Bharat to
                acquire essential communication, knowledge, and life skills.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-start">
              <a
                href="https://drive.google.com/file/d/1bn4YWYXDZo3FQ6OBtV2Kw83NMzNWpDkB/view"
                target="_blank"
                rel="noreferrer"
              >
                <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-inter font-semibold text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                  Learn more
                </button>
              </a>
            </div>
          </div>

          {/* Right Video / Image Section */}
          <div className="order-1 lg:order-2">
            <a
              href="https://youtu.be/W3INztp7TuU?si=SPvJ4bdE8IyMaaAw"
              target="_blank"
              rel="noreferrer"
              className="block relative group w-full aspect-[4/5] lg:aspect-square max-h-[500px] mx-auto rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Image */}
              <img
                src={sulabhApp}
                alt="Sulabh App demonstration"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>

                  {/* Button Icon */}
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
