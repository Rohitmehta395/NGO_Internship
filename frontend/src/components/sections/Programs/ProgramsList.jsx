import React from "react";

const ProgramsList = () => {
  // Placeholder for programs data
  const programs = [
    { id: 1, title: "Digital Literacy Bootcamp", description: "12-week digital skills program." },
    { id: 2, title: "Youth Leadership Academy", description: "Leadership and project management." },
    { id: 3, title: "STEM Innovation Lab", description: "Hands-on STEM learning." },
  ];

  return (
    <div className="container-custom section-padding">
      <h2 className="text-2xl font-bold mb-8 text-center">Our Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <div key={program.id} className="card p-6">
            <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
            <p>{program.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramsList;
