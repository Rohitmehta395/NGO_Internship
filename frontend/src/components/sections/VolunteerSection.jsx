import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaHeart, FaUsers, FaGlobe } from "react-icons/fa";
import Card from "../common/Card";
import Button from "../common/Button";
import { ANIMATION_VARIANTS } from "../../utils/constants";

const VolunteerSection = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Why We Need You Become a Volunteer",
      answer:
        "Our volunteers are the backbone of our mission. We need passionate individuals who believe in the power of education to change lives. Your skills, time, and dedication help us reach more communities and create lasting impact.",
      details: [
        "Help bridge the education gap in underserved communities",
        "Share your expertise and skills with eager learners",
        "Be part of a global movement for educational equity",
        "Gain valuable experience while making a difference",
      ],
    },
    {
      id: 2,
      question: "Be Part of a Community",
      answer:
        "Join a vibrant community of like-minded individuals from around the world. Our volunteer network spans continents, cultures, and disciplines, united by a common goal of improving education access.",
      details: [
        "Connect with volunteers from 50+ countries",
        "Participate in monthly virtual meetups and events",
        "Access exclusive training and development programs",
        "Build lifelong friendships and professional networks",
      ],
    },
  ];

  const volunteerStats = [
    { icon: FaUsers, number: "2,500+", label: "Active Volunteers" },
    { icon: FaGlobe, number: "45+", label: "Countries" },
    { icon: FaHeart, number: "50K+", label: "Hours Contributed" },
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <section className="section-padding section-bg">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Image and Stats */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative">
              <img
                src="/api/placeholder/500/400"
                alt="Volunteers teaching children"
                className="w-full rounded-2xl shadow-xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>

              {/* Floating volunteer card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaHeart className="text-primary-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Thank You!</div>
                    <div className="text-sm text-gray-600">
                      From our students
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Volunteer Stats */}
            <div className="grid grid-cols-3 gap-6">
              {volunteerStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="text-primary-600" />
                  </div>
                  <div className="font-bold text-2xl text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - FAQ and CTA */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Join our community of passionate volunteers and help us
                transform lives through education. Every contribution matters,
                no matter how big or small.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronDown className="text-gray-400" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 space-y-4">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                            <ul className="space-y-2">
                              {faq.details.map((detail, detailIndex) => (
                                <li
                                  key={detailIndex}
                                  className="flex items-start text-sm text-gray-600"
                                >
                                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" className="flex-1">
                Become a Volunteer
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
