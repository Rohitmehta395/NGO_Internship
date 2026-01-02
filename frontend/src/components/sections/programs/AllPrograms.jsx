import { Link } from "react-router-dom";
import SchoolSapling from "../../../assets/schoolSapling.webp";
import SulabhUniversalLearningApp from "../../../assets/sulabhUniversalLearningApp.webp";

export default function AllPrograms() {
  const programs = [
    {
      id: 1,
      title: "Sharada Academy",
      description:
        "A structured learning initiative that supports after-school academics, spoken English, and life-skills training for rural students and teachers.",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/1bbb09463828926f6b010dd177a295d16c862d83?width=832",
      route: "/programs/sharada-academy",
    },
    {
      id: 2,
      title: "Project Sulabh",
      description:
        "An ed-tech and community empowerment programme: online spoken English and soft-skills courses for rural teachers and under-privileged students, delivered via the Sulabh learning app.",
      image: SulabhUniversalLearningApp,
      route: "/programs/project-sulabh",
    },
    {
      id: 3,
      title: "Project JnanaShala",
      description:
        "A school-support programme that provides library kits, digital learning tools, STEM activities, and value-based learning to enhance the learning environment in government schools.",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/b3dffa61b6c3b6fc13ab586ac4da190e0034d68e?width=832",
      route: "/programs/jnanashala",
    },
    {
      id: 4,
      title: "Others",
      description:
        "Initiatives including the School Sapling Project and Financial Inclusion, focused on environmental awareness and basic financial literacy.",
      image: SchoolSapling,
      route: "/programs/others",
    },
  ];

  return (
    <section
      className="bg-gray-50 py-12 px-4 sm:py-16 lg:py-24"
      id="next-section"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Optional Header - Uncomment if needed */}
        {/* <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#0B0B45] sm:text-4xl font-sans">
            Our Programs
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Empowering communities through education and innovation.
          </p>
        </div> */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative h-56 overflow-hidden sm:h-64 lg:h-72">
                <img
                  src={program.image}
                  alt={program.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay gradient for better text contrast if you ever put text on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="mb-3 text-2xl font-bold leading-tight text-[#0B0B45] font-sans">
                  {program.title}
                </h3>

                <p className="mb-6 flex-grow text-base leading-relaxed text-gray-600 font-sans">
                  {program.description}
                </p>

                <Link to={program.route} className="mt-auto block w-full">
                  <button className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-orange-400 px-6 py-4 font-bold uppercase text-white transition-all hover:bg-orange-500 active:scale-95 cursor-pointer">
                    View Details
                    {/* Simple arrow icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
