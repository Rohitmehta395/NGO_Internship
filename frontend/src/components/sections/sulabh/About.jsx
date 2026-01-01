import { motion } from "framer-motion";

const About = () => {
  // Data for the left-side text content
  const aboutPoints = [
    {
      title: "USP no.1",
      content:
        "Accessibility from any device with a browser and wi-fi connectivity, without needing to install or update software.",
    },
    {
      title: "Developed by Sharada Educational Trust",
      content:
        "In collaboration with Bern University of Applied Sciences (BFH University). Launched on 14th June 2025 at Government Model Primary School Sathanuru village (Kanakapura Taluk).",
    },
    {
      title: "Designed to empower educators and learners",
      content:
        "(Grade 3 and onwards) from rural Government Schools across India. Offers topics like Spoken English, Financial Literacy, General Knowledge, Math, Science and more.",
    },
    {
      title: "Web-based App (not Android or iOS)",
      content:
        "That consumes no space on the phone. Can be accessed from Laptops, Desktops, Tablets and Smartphones.",
    },
    {
      title: "Sulabh App 1.0",
      content:
        "Has benefitted more than 70 Government Schools across 3 States (Karnataka, Maharashtra & Telangana).",
    },
  ];

  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-teachers font-bold text-3xl md:text-4xl lg:text-5xl text-[#0B0B45] text-center mb-12 lg:mb-20">
          About Sulabh App 2.0
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content - Text List */}
          <div className="space-y-8">
            {aboutPoints.map((point, index) => (
              <div key={index} className="flex flex-col gap-1">
                <span className="font-semibold text-[#0B0B45] text-lg font-inter text-justify hyphens-auto">
                  {point.title}:
                </span>
                <p className="font-inter text-base md:text-md leading-relaxed text-[#0B0B45]/70 text-justify hyphens-auto">
                  {point.content}
                </p>
              </div>
            ))}
          </div>

          {/* Right Content - Visual Element */}
          {/* Using w-full and max-w to make it responsive, removed fixed ml-[100px] */}
          <div className="flex justify-center items-center w-full">
            <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
              {/* Animated soft orange glow */}
              <motion.div
                className="absolute w-[110%] h-[110%] rounded-full bg-orange-400/20 blur-[60px]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Frosted glass circle */}
              <div className="relative w-full h-full rounded-full backdrop-blur-xl border border-white/40 bg-white/20 shadow-[0_0_50px_-10px_rgba(249,115,22,0.3)] flex flex-col items-center justify-center text-center px-6 sm:px-10 overflow-hidden z-10">
                {/* Inner subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-orange-200/20 pointer-events-none" />

                {/* Text content */}
                <div className="relative z-10 space-y-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0B0B45] leading-snug drop-shadow-sm">
                    The Catalyst of <br />
                    <span className="text-orange-500 font-bold block mt-1">
                      Rural Education
                    </span>
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg text-[#0B0B45]/80 italic max-w-[260px] mx-auto leading-relaxed font-medium">
                    “If you empower a Govt. School Teacher, the entire School
                    benefits.”
                  </p>

                  {/* Accent underline */}
                  <div className="w-16 h-1 bg-orange-500/80 mx-auto rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
