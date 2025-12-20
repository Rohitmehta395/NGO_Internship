import React from "react";

import Hero from "../components/sections/programs/Hero";
import AllPrograms from "../components/sections/programs/AllPrograms";
import Banner from "../components/common/Banner";

import programHeroImage from "../assets/programHero.webp";

const Programs = () => {
  return (
    <div>
      {/* <Hero/> */}
      <Banner
        image={programHeroImage}
        title="Our Programs"
        currentPath={location.pathname}
      />
      <AllPrograms />
    </div>
  );
};

export default Programs;
