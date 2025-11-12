import React from "react";
import AboutHero from "../components/sections/about/AboutHero";
import AboutInspiration from "../components/sections/about/AboutInspiration";
import GuidingSpirit from "../components/sections/about/GuidingSpirit";
import Trustees from "../components/sections/about/Trustees";
import AdvisoryBoard from "../components/sections/about/AdvisoryBoard";

//Trutees Images
import arvindImage from "../assets/arvindImage.webp";
import anitaImage from "../assets/anitaImage.webp";
import dineshImage from "../assets/dineshImage.webp";

//Advisory Board Images
import suryanarayana from "../assets/suryanarayana.webp";
import ltCol from "../assets/ltCol.webp";
import uma from "../assets/uma.webp";
import shwetha from "../assets/shwetha.webp";

//Background Image in Advisory board component
import bgImage from "../assets/advisoryboardmembersbackgroundimage.webp";

const About = () => {
  const trusteesData = [
    {
      name: "Arvind Kamath",
      image: arvindImage,
      link: "https://www.linkedin.com/in/arvindakamath",
    },
    {
      name: "Anita Kamath",
      image: anitaImage,
      link: "https://www.linkedin.com/in/anita-kamath-8510b7252",
    },
    {
      name: "Dinesh Shenoy",
      image: dineshImage,
      link: "https://www.linkedin.com/in/dinesh-shenoy-8415638",
    },
  ];

  const advisoryMembers = [
    {
      name: "Suryanarayana Murthy",
      image: suryanarayana,
      link: "https://www.linkedin.com/in/pappumurthy",
    },
    {
      name: "Lt Col Atul Bakshi",
      image: ltCol,
      link: "https://www.linkedin.com/in/lt-col-atul-bakshi-retd-514705b",
    },
    {
      name: "Uma Nataraj",
      image: uma,
      link: "https://www.linkedin.com/in/uma-nataraj-171078193",
    },
    {
      name: "Shwetha P.S.",
      image: shwetha,
      link: "https://www.linkedin.com/in/shwetha-p-s-062803309",
    },
  ];

  return (
    <>
      <AboutHero />
      <AboutInspiration />
      <GuidingSpirit />
      <Trustees trustees={trusteesData} />
      <AdvisoryBoard members={advisoryMembers} backgroundImage={bgImage} />
    </>
  );
};

export default About;
