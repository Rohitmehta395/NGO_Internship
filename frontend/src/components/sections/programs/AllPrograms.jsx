import { Link } from "react-router-dom";

export default function AllPrograms() {
  const programs = [
    {
      id: 1,
      title: "Sharada Academy",
      description: "A structured learning initiative that supports after-school academics, spoken English, and life-skills training for rural students and teachers.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/1bbb09463828926f6b010dd177a295d16c862d83?width=832",
      route: "/programs/sharada-academy"
    },
    {
      id: 2,
      title: "Project Sulabh",
      description: "An ed-tech and community empowerment programme: online spoken English and soft-skills courses for rural teachers and under-privileged students, delivered via the Sulabh learning app.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/806fd369b9ef4655f05c989af33b7a34b2620f8a?width=832",
      route: "/programs/project-sulabh"
    },
    {
      id: 3,
      title: "Project JnanaShala",
      description: "A school-support programme that provides library kits, digital learning tools, STEM activities, and value-based learning to enhance the learning environment in government schools.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/b3dffa61b6c3b6fc13ab586ac4da190e0034d68e?width=832",
      route: "/programs/jnanashala"
    },
    {
      id: 4,
      title: "Others",
      description: "Initiatives including the School Sapling Project and Financial Inclusion, focused on environmental awareness and basic financial literacy.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/11b1a46a0749630374fa2ff412483125e236902d?width=832",
      route: "/programs/others"
    },
  ];

  return (
    <div className="flex flex-col items-center py-12 px-4 sm:py-16 sm:px-6 lg:py-[120px] lg:px-[72px] bg-white" id="next-section">
      <div className="w-full max-w-[1296px]">
        <div className="flex justify-center items-start mb-10 sm:mb-12 lg:mb-[60px]">
          <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-bold leading-none text-black" style={{ fontFamily: 'Teachers, -apple-system, Roboto, Helvetica, sans-serif' }}>
            All Programs
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 mx-[100px]">
          {programs.map((program) => (
            <div
              key={program.id}
              className="flex flex-col rounded-[20px] bg-white overflow-hidden"
              style={{ boxShadow: '0 4px 13px 0 rgba(0, 0, 0, 0.05)' }}
            >
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-[200px] sm:h-[240px] lg:h-[280px] object-cover"
              />
              
              <div className="flex flex-col gap-6 sm:gap-7 p-5 sm:px-5 sm:pt-7 sm:pb-10">
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl sm:text-[28px] font-bold leading-none text-black" style={{ fontFamily: 'Teachers, -apple-system, Roboto, Helvetica, sans-serif' }}>
                    {program.title}
                  </h2>
                  <p className="text-base leading-5 text-black/60 line-clamp-3" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                    {program.description}
                  </p>
                </div>

                <Link to={program.route}>
                <button className="flex h-[60px] items-center justify-center rounded-xl bg-black px-10 py-4 transition-opacity hover:opacity-90">
                  <span className="text-base font-bold uppercase text-white leading-none" style={{ fontFamily: 'Teachers, -apple-system, Roboto, Helvetica, sans-serif' }}>
                    View Details
                  </span>
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
