import React from "react";
import Hero from "../components/sections/sulabh/Hero";
import Mission from "../components/sections/sulabh/Mission";
import Features from "../components/sections/sulabh/Features";
import CoreModules from "../components/sections/sulabh/CoreModules";
import About from "../components/sections/sulabh/About";
// import Impact from "../components/sections/Sulabh/Impact";


export default function Sulabh() {
  return (
    <div className="flex flex-col items-center bg-white">
      {/* Hero Section */}
      <Hero />
      {/* Info Block - Mission Section */}
      <Mission />
      {/* Info Block 2 - Features */}
      <Features />
      {/* Core Modules Section */}
      <CoreModules />
      {/* About Sulabh App 2.0 Section */}
      <About />
      {/* <Impact /> */}
    </div>
  );
}
