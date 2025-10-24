import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaGraduationCap, FaGlobe, FaHeart } from "react-icons/fa";
import Button from "../common/Button";
import { ANIMATION_VARIANTS } from "../../utils/constants";

const ChangeWorld = () => {
  const impactStats = [
    {
      icon: FaUsers,
      number: "50,000+",
      label: "Students Reached",
      description: "Lives transformed through education",
    },
    {
      icon: FaGraduationCap,
      number: "25,000+",
      label: "Certificates Issued",
      description: "Skills validated and recognized",
    },
    {
      icon: FaGlobe,
      number: "45+",
      label: "Countries Served",
      description: "Global reach and impact",
    },
    {
      icon: FaHeart,
      number: "95%",
      label: "Success Rate",
      description: "Students completing programs",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Together Let's Change The World
          </motion.h2>

          <motion.p
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Education is the most powerful tool for creating positive change.
            Join us in our mission to make quality education accessible to
            everyone, everywhere. Your support can transform lives and build a
            better tomorrow.
          </motion.p>
        </motion.div>

        {/* Impact Statistics */}
        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <stat.icon className="text-2xl" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-white/80">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-lg text-white/90 mb-8">
              Whether you want to volunteer, donate, or partner with us, there
              are many ways to support our mission. Every contribution, big or
              small, helps us reach more students and communities.
            </p>
          </motion.div>

          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
          >
            <Button variant="white" size="lg" className="w-full sm:w-auto">
              Start Volunteering
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
            >
              Make a Donation
            </Button>
          </motion.div>

          {/* Partner Logos Section */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="pt-16 border-t border-white/20"
          >
            <p className="text-white/80 mb-8">
              Trusted by organizations worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[1, 2, 3, 4, 5].map((partner) => (
                <div
                  key={partner}
                  className="w-24 h-12 bg-white/20 rounded-lg flex items-center justify-center"
                >
                  <span className="text-white/60 font-semibold">LOGO</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChangeWorld;
