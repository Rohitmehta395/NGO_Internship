import sulabhApp from "../../../assets/home/FlagshipPrograms_images/sulabhapp.webp";

const Mission = () => {
  return (
    <section className="w-full px-6 sm:px-12 lg:px-[70px] py-16 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[200px] items-center">
          {/* Left Content */}
          <div>
            {/* Line + Label */}
            <div className="flex items-center gap-6 mb-6 lg:mb-8">
              <div className="w-[72px] h-0.5 bg-[#1D2130]"></div>
              <h3 className="font-inter font-semibold text-sm tracking-[2px] uppercase text-[#0B0B45]">
                Know more
              </h3>
            </div>

            {/* Heading */}
            <h2 className="font-inter font-extrabold text-[40px] lg:text-[48px] leading-[120%] text-[#0B0B45] mb-6 lg:mb-8">
              Sulabh App 2.0!
            </h2>

            {/* Paragraphs */}
            <div
              className="space-y-6 mb-8 lg:mb-12"
              style={{ fontFamily: "roboto" }}
            >
              <p className="font-inter text-base text-[#525560] leading-[160%]">
                Designed to empower learners and educators in rural and
                underserved communities, the Web-based App offers accessible,
                self-paced courses in Spoken English, Financial Literacy,
                General Knowledge, Soft Skills, and more.
              </p>
              <p className="font-inter text-base text-[#525560] leading-[160%]">
                <span className="font-bold text-[#0B0B45]">
                  Sharada Educational Trust
                </span>{" "}
                is on a mission to bridge the digital divide and dismantle
                educational barriers, empowering learners in rural Bharat to
                acquire essential communication, knowledge, and life skills.
              </p>
            </div>

            {/* Button */}
            <a
              href="https://drive.google.com/file/d/1bn4YWYXDZo3FQ6OBtV2Kw83NMzNWpDkB/view"
              target="_blank"
            >
              <button className="inline-flex items-center justify-center px-8 py-3 bg-orange-400 hover:bg-[#e96f14] text-white font-inter font-medium text-base rounded-md transition-colors cursor-pointer">
                Learn more
              </button>
            </a>
          </div>

          {/* Right Video */}
          <a
            href="https://youtu.be/W3INztp7TuU?si=SPvJ4bdE8IyMaaAw"
            target="_blank"
          >
            <div className="relative w-full aspect-[480/500] rounded-[20px] overflow-hidden group cursor-pointer">
              <img
                src={sulabhApp}
                alt="Sulabh App demonstration"
                className="w-full h-full object-cover brightness-[1.05]"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/25 transition-all"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <svg
                    className="w-5 h-5 ml-1"
                    viewBox="0 0 24 24"
                    fill="#1D2130"
                  >
                    <path d="M8 5.14v13.72L19 12L8 5.14z" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Mission;
