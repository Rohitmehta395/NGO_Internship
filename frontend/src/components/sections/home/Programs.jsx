import React from "react";
import { BookOpen, Users, Lightbulb, MoreHorizontal } from "lucide-react";

function ProjectCard({ icon: Icon, title, description, href }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center flex flex-col items-center min-h-[320px] md:min-h-[380px] border-none">
      <div className="bg-[#0a2540] text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 md:mb-6">
        {Icon && <Icon className="w-8 h-8 md:w-10 md:h-10" />}
      </div>

      <h3 className="font-bold text-sm md:text-base mb-3 md:mb-4 tracking-wide text-gray-900 uppercase">
        {title}
      </h3>

      <p className="text-gray-600 text-sm mb-4 md:mb-6 leading-relaxed italic grow">
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
    <section className="relative overflow-hidden w-full">
      {/* Spacer Div (White Part):
        - 'hidden': Hides this completely on mobile (No white space).
        - 'md:block': Shows it on desktop to create the backdrop for the overlap.
      */}
      <div className="hidden md:block bg-white pb-16 md:pb-70 w-full"></div>

      {/* Main Container:
        - 'bg-[#FF8904]': Orange background for BOTH mobile and desktop.
        - 'py-12': Adds padding on mobile so cards don't touch the edges.
        - Desktop padding adjusted to accommodate the overlap logic.
      */}
      <div className="bg-[#FF8904] py-12 md:pt-48 md:pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Grid Container:
            - 'mt-0': On mobile, cards sit naturally inside the orange box.
            - 'md:-mt-96': On desktop, they are pulled up to overlap the white section.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-0 md:-mt-96 relative z-10">
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
      </div>
    </section>
  );
}
