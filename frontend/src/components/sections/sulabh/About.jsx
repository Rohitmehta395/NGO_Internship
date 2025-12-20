import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="w-full px-6 sm:px-12 lg:px-[72px] py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="font-teachers font-bold text-3xl sm:text-4xl lg:text-[40px] text-[#0B0B45] text-center mb-12 lg:mb-16">
          About Sulabh App 2.0
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="font-inter text-base leading-6 text-[#0B0B45]/60">
              <span className="font-semibold text-[#0B0B45]">USP no.1: </span>{" "}
              Accessibility from any device with a browser and wi-fi
              connectivity,without needing to install or update software
            </p>
            <p className="font-inter text-base leading-6 text-[#0B0B45]/60">
              <span className="font-semibold text-[#0B0B45]">
                {" "}
                Developed by Sharada Educational Trust{" "}
              </span>
              in collaboration with Bern University of Applied Sciences (BFH
              University).Launched on 14th June 2025 at Government Model Primary
              School Sathanuru village (Kanakapura Taluk)
            </p>
            <p className="font-inter text-base leading-6 text-[#0B0B45]/60">
              <span className="font-semibold text-[#0B0B45]">
                Designed to empower educators and learners
              </span>{" "}
              (Grade 3 and onwards) from rural Government Schools across India.
              Offers topics like Spoken English, Financial Literacy, General
              Knowledge, Math, Science and more.
            </p>

            <p className="font-inter text-base leading-6 text-[#0B0B45]/60">
              <span className="font-semibold text-[#0B0B45]">
                {" "}
                Web-based App (not Android or iOS){" "}
              </span>
              that consumes no space on the phone. Can be accessed from Laptops.
              Desktops, Tablets and Smartphones.
            </p>
            <p className="font-inter text-base leading-6 text-[#0B0B45]/60">
              <span className="font-semibold text-[#0B0B45]">
                Sulabh App 1.0{" "}
              </span>{" "}
              has benefitted more than 70 Government Schools across 3 States
              (Karnataka, Maharashtra & Telangana)
            </p>
          </div>

          {/* Right Certificate Image */}
          <section className="relative flex items-center justify-center w-full lg:w-[460px] h-[460px] ml-[100px]">
            {/* Animated soft orange glow */}
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full bg-orange-400/20 blur-3xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Frosted glass circle */}
            <div className="relative w-[460px] h-[460px] rounded-full backdrop-blur-xl border border-white/20 bg-white/15 shadow-[0_0_50px_-10px_rgba(249,115,22,0.4)] flex flex-col items-center justify-center text-center px-10 overflow-hidden">
              {/* Inner subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-orange-200/10 pointer-events-none" />

              {/* Text content */}
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#0B0B45] leading-snug drop-shadow-sm">
                  The Catalyst of{" "}
                  <span className="text-orange-500 font-bold">
                    Rural Education
                  </span>
                </h2>

                <p className="mt-6 text-base sm:text-lg text-gray-800/80 italic max-w-xs mx-auto leading-relaxed">
                  “If you empower a Govt. School Teacher, the entire School
                  benefits.”
                </p>

                {/* Accent underline */}
                <div className="mt-8 w-16 h-[2px] bg-orange-500/70 mx-auto rounded-full" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default About;
