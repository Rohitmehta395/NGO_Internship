import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/sections/Hero";
import Programs from "../components/sections/Programs";
import EducationForAll from "../components/sections/EducationForAll";
import FlagshipPrograms from "../components/sections/FlagshipPrograms";
import VolunteerSection from "../components/sections/VolunteerSection";
import ChangeWorld from "../components/sections/ChangeWorld";
import Newsletter from "../components/sections/Newsletter";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Programs />
      <EducationForAll />
      <FlagshipPrograms />
      <VolunteerSection />
      <ChangeWorld />
      <Newsletter />
    </motion.div>
  );
};

export default Home;
