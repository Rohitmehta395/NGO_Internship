// import React from "react";
// import { motion } from "framer-motion";
// import { FaUsers, FaGraduationCap, FaNewspaper, FaStar } from "react-icons/fa";
// import Card from "../common/Card";
// import Button from "../common/Button";
// import { ANIMATION_VARIANTS } from "../../utils/constants";

// const Programs = () => {
//   const programs = [
//     {
//       id: 1,
//       title: "Online Academy",
//       description:
//         "Comprehensive online learning platform with interactive courses, live sessions, and personalized learning paths.",
//       icon: <FaGraduationCap className="text-3xl text-blue-500" />,
//       participants: "25k",
//       color: "bg-blue-500",
//       features: ["Live Classes", "Certificates", "Expert Mentors"],
//     },
//     {
//       id: 2,
//       title: "Project Salaam",
//       description:
//         "Building bridges through education, fostering understanding and cooperation across diverse communities worldwide.",
//       icon: <FaUsers className="text-3xl text-green-500" />,
//       participants: "15k",
//       color: "bg-green-500",
//       features: ["Community Building", "Cultural Exchange", "Peace Education"],
//     },
//     {
//       id: 3,
//       title: "Project Journalism",
//       description:
//         "Empowering the next generation of journalists with digital skills, ethics, and storytelling techniques.",
//       icon: <FaNewspaper className="text-3xl text-purple-500" />,
//       participants: "8k",
//       color: "bg-purple-500",
//       features: ["Media Literacy", "Digital Skills", "Ethics Training"],
//     },
//     {
//       id: 4,
//       title: "Others",
//       description:
//         "Specialized programs including STEM education, arts, life skills, and vocational training for diverse needs.",
//       icon: <FaStar className="text-3xl text-orange-500" />,
//       participants: "12k",
//       color: "bg-orange-500",
//       features: ["STEM Focus", "Creative Arts", "Life Skills"],
//     },
//   ];

//   return (
//     <section id="programs" className="section-padding section-bg">
//       <div className="container-custom">
//         <motion.div
//           variants={ANIMATION_VARIANTS.staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <motion.h2
//             variants={ANIMATION_VARIANTS.fadeInUp}
//             className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
//           >
//             Our Programs
//           </motion.h2>
//           <motion.p
//             variants={ANIMATION_VARIANTS.fadeInUp}
//             className="text-xl text-gray-600 max-w-3xl mx-auto"
//           >
//             Discover our comprehensive range of educational programs designed to
//             empower learners of all ages and backgrounds.
//           </motion.p>
//         </motion.div>

//         <motion.div
//           variants={ANIMATION_VARIANTS.staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
//         >
//           {programs.map((program, index) => (
//             <motion.div
//               key={program.id}
//               variants={ANIMATION_VARIANTS.fadeInUp}
//               className="group"
//             >
//               <Card className="h-full text-center hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
//                 <div className="mb-6">
//                   <div
//                     className={`w-16 h-16 ${program.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
//                   >
//                     <div className="text-white text-2xl">{program.icon}</div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                     {program.title}
//                   </h3>
//                   <p className="text-gray-600 mb-4 leading-relaxed">
//                     {program.description}
//                   </p>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
//                     <FaUsers />
//                     <span>{program.participants} participants</span>
//                   </div>

//                   <div className="space-y-2">
//                     {program.features.map((feature, featureIndex) => (
//                       <div
//                         key={featureIndex}
//                         className="text-sm text-gray-600 flex items-center justify-center"
//                       >
//                         <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
//                         {feature}
//                       </div>
//                     ))}
//                   </div>

//                   <div className="pt-4">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="w-full group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500"
//                     >
//                       Learn More
//                     </Button>
//                   </div>
//                 </div>
//               </Card>
//             </motion.div>
//           ))}
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.8 }}
//           className="text-center mt-12"
//         >
//           <Button variant="primary" size="lg">
//             View All Programs
//           </Button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Programs;

import React from 'react'

const Programs = () => {
  return (
    <div className='mt-100!'>Programs</div>
  )
}

export default Programs