import React from "react";
import AllPrograms from "../components/sections/programs/AllPrograms";
import Banner from "../components/common/Banner";

import programHeroImage from "../assets/programHero.webp";

const Programs = () => {
  return (
    <div>
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
