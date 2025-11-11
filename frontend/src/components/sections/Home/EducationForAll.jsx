import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Button from "../../common/Button";
import { ANIMATION_VARIANTS } from "../../../utils/constants";

const EducationForAll = () => {
  const galleryImages = [
    {
      id: 1,
      src: "/api/placeholder/300/400",
      alt: "Students in classroom",
      title: "Interactive Learning",
    },
    {
      id: 2,
      src: "/api/placeholder/300/400",
      alt: "Online education session",
      title: "Digital Classrooms",
    },
    {
      id: 3,
      src: "/api/placeholder/300/400",
      alt: "Community education program",
      title: "Community Outreach",
    },
    {
      id: 4,
      src: "/api/placeholder/300/400",
      alt: "Graduation ceremony",
      title: "Success Stories",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                #Education <span className="text-primary-500">For All</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We believe that quality education should be accessible to
                everyone, regardless of their background, location, or
                circumstances.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our comprehensive programs are designed to break down barriers
                and create opportunities for learners worldwide. From digital
                literacy to advanced skills training, we're committed to
                empowering communities through education.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-primary-500 mb-2">
                  50,000+
                </div>
                <div className="text-sm text-gray-600">Lives Impacted</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-secondary-500 mb-2">
                  25+
                </div>
                <div className="text-sm text-gray-600">Countries Served</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-green-500 mb-2">
                  95%
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-500 mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" icon={<FaArrowRight />}>
                Join Our Mission
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Gallery */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {image.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl border"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-xl">🎓</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">10,000+</div>
                  <div className="text-sm text-gray-600">
                    Graduates This Year
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationForAll;
