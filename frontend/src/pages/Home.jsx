import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/sections/home/Hero";
import Programs from "../components/sections/home/Programs";
import EducationForAll from "../components/sections/home/EducationForAll";
import FlagshipPrograms from "../components/sections/home/FlagshipPrograms";
import VolunteerSection from "../components/sections/home/VolunteerSection";
import DonationSection from "../components/sections/home/DonationSection";
import NewsLetter from "../components/sections/home/NewsLetter";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      {/* <Programs />   */}
      <EducationForAll />
      <FlagshipPrograms />
      <NewsLetter />
      <VolunteerSection />
      <DonationSection />
    </motion.div>
  );
};

export default Home;
