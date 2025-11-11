import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/sections/Home/Hero";
import EducationForAll from "../components/sections/Home/EducationForAll";
import FlagshipPrograms from "../components/sections/Home/FlagshipPrograms";
import VolunteerSection from "../components/sections/Home/VolunteerSection";
import ChangeWorld from "../components/sections/Home/ChangeWorld";
import Newsletter from "../components/sections/Home/Newsletter";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      {/* <EducationForAll />
      <FlagshipPrograms />
      <VolunteerSection />
      <ChangeWorld />
      <Newsletter /> */}
    </motion.div>
  );
};

export default Home;
