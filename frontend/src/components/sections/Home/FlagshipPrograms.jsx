import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaUsers, FaClock, FaAward } from "react-icons/fa";
import Card from "../../common/Card";
import Button from "../../common/Button";
import { ANIMATION_VARIANTS } from "../../../utils/constants";

const FlagshipPrograms = () => {
  const flagshipPrograms = [
    {
      id: 1,
      title: "Digital Literacy Bootcamp",
      description:
        "Comprehensive 12-week program covering essential digital skills for the modern workforce.",
      image: "/api/placeholder/400/300",
      duration: "12 weeks",
      participants: "2,500+",
      rating: 4.9,
      highlights: [
        "Career-focused curriculum",
        "Industry mentorship",
        "Job placement assistance",
      ],
      category: "Professional Development",
    },
    {
      id: 2,
      title: "Youth Leadership Academy",
      description:
        "Empowering young leaders with skills in communication, project management, and social impact.",
      image: "/api/placeholder/400/300",
      duration: "8 weeks",
      participants: "1,800+",
      rating: 4.8,
      highlights: ["Leadership skills", "Community projects", "Global network"],
      category: "Leadership",
    },
    {
      id: 3,
      title: "STEM Innovation Lab",
      description:
        "Hands-on science, technology, engineering, and mathematics program with real-world applications.",
      image: "/api/placeholder/400/300",
      duration: "16 weeks",
      participants: "3,200+",
      rating: 4.9,
      highlights: [
        "Project-based learning",
        "Research opportunities",
        "Innovation challenges",
      ],
      category: "STEM",
    },
    {
      id: 4,
      title: "Creative Arts Workshop",
      description:
        "Explore various forms of artistic expression while developing technical and creative skills.",
      image: "/api/placeholder/400/300",
      duration: "10 weeks",
      participants: "1,500+",
      rating: 4.7,
      highlights: [
        "Multi-disciplinary approach",
        "Portfolio development",
        "Exhibition opportunities",
      ],
      category: "Arts",
    },
  ];

  return (
    <section className="section-padding bg-navy-900 text-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="inline-flex items-center space-x-2 bg-primary-500/20 text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <FaAward />
            <span>Featured Programs</span>
          </motion.div>

          <motion.h2
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Know More About Our Flagship Programs
          </motion.h2>

          <motion.p
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Discover our most impactful educational programs that have
            transformed thousands of lives across the globe.
          </motion.p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {flagshipPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="group"
            >
              <Card className="bg-white text-gray-900 h-full hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:scale-[1.02]">
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {program.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1 text-sm font-medium">
                      <span className="text-yellow-500">★</span>
                      <span>{program.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <FaClock />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaUsers />
                      <span>{program.participants} enrolled</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {program.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={highlightIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<FaArrowRight />}
                      className="w-full"
                    >
                      Explore More
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button variant="primary" size="lg" icon={<FaArrowRight />}>
            View All Programs
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FlagshipPrograms;
