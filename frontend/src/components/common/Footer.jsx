import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  SOCIAL_LINKS,
  CONTACT_INFO,
  NAVIGATION_LINKS,
} from "../../utils/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    facebook: FaFacebook,
    twitter: FaTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
  };

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-bold text-xl">Education</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering communities through quality education and innovative
              learning solutions. Together, we can change the world one student
              at a time.
            </p>
            <div className="flex space-x-4">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                const Icon = socialIcons[platform];
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors duration-200"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Programs</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/programs/online-academy"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Online Academy
                </a>
              </li>
              <li>
                <a
                  href="/programs/project-salaam"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Project Salaam
                </a>
              </li>
              <li>
                <a
                  href="/programs/journalism"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Project Journalism
                </a>
              </li>
              <li>
                <a
                  href="/volunteer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Become a Volunteer
                </a>
              </li>
              <li>
                <a
                  href="/scholarship"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Scholarships
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-primary-500 mt-1" size={16} />
                <div>
                  <p className="text-gray-300">{CONTACT_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaPhone className="text-primary-500 mt-1" size={16} />
                <div>
                  <p className="text-gray-300">{CONTACT_INFO.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-500 mt-1" size={16} />
                <div>
                  <p className="text-gray-300">{CONTACT_INFO.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} Education Organization. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a
              href="/privacy"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="/sitemap"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
