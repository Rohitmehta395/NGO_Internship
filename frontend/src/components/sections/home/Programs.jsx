import React from "react";
import { BookOpen, Users, Lightbulb, MoreHorizontal } from "lucide-react";

function ProjectCard({ icon: Icon, title, description, href }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col items-center min-h-[380px]">
      <div className="bg-[#0a2540] text-white w-20 h-20 rounded-full flex items-center justify-center mb-6">
        {Icon && <Icon className="w-10 h-10" />}
      </div>

      <h3 className="font-bold text-base mb-4 tracking-wide text-gray-900 uppercase">
        {title}
      </h3>

      <p className="text-gray-600 text-sm mb-6 leading-relaxed italic flex-grow">
        {description}
      </p>

      <a
        href={href}
        className="text-blue-600 text-sm font-bold tracking-wider hover:text-blue-800 transition uppercase"
      >
        More
      </a>
    </div>
  );
}

export default function Programs() {
  const projects = [
    {
      title: "SHARADA ACADEMY",
      description:
        "Online 'Spoken English' Courses for teachers and students from rural government schools.",
      icon: BookOpen,
      href: "/programs",
    },
    {
      title: "PROJECT SULABH",
      description:
        "Financial Literacy Workshops through storytelling, drama competitions, and quizzes for rural school students.",
      icon: Users,
      href: "/programs",
    },
    {
      title: "PROJECT JNANASHALA",
      description:
        "Setting up Libraries in rural community centres and rural Government Schools.",
      icon: Lightbulb,
      href: "/programs",
    },
    {
      title: "OTHERS",
      description:
        "Other programs like School Sapling Project and Financial Inclusion.",
      icon: MoreHorizontal,
      href: "/programs",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* White Top Section */}
      <div className="bg-white pb-70 w-full"></div>

      {/* Orange Section */}
      <div className="bg-[#FF8904] pt-48 pb-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-96">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              icon={project.icon}
              title={project.title}
              description={project.description}
              href={project.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
