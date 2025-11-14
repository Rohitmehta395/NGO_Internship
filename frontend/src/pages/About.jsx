import React from "react";
import AboutHero from "../components/sections/about/AboutHero";
import AboutInspiration from "../components/sections/about/AboutInspiration";
import GuidingSpirit from "../components/sections/about/GuidingSpirit";
import Trustees from "../components/sections/about/Trustees";
import AdvisoryBoard from "../components/sections/about/AdvisoryBoard";
import Patrons from "../components/sections/about/Patrons";
import Volunteers from "../components/sections/about/Volunteers";

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
import AdvisoryBgImage from "../assets/advisoryboardmembersbackgroundimage.webp";

//Images of Patrons
import pvMaiya from "../assets/AboutUsPics/Patrons_Images/P.V.Maiya.webp";
import sridhar from "../assets/AboutUsPics/Patrons_Images/SridharRajagopalan.webp";
import Mohan from "../assets/AboutUsPics/Patrons_Images/MohanRao.webp";
import Jagannath from "../assets/AboutUsPics/Patrons_Images/JagannathKamath.webp";
import Vasundhara from "../assets/AboutUsPics/Patrons_Images/VasundharaSukeerthi.webp";
import vijaya from "../assets/AboutUsPics/Patrons_Images/VijayaShenoy.webp";

//Volunteer Background Image
import VolunteerBgImage from "../assets/AboutUsPics/Volunteer_Images/VolunteerBgImage.webp";

//Images of Patrons
import david from "../assets/AboutUsPics/Volunteer_Images/DavidPfister.webp";
import marcel from "../assets/AboutUsPics/Volunteer_Images/MarcelZbinden.webp";
import Tobias from "../assets/AboutUsPics/Volunteer_Images/Tobias.webp";
import Priya from "../assets/AboutUsPics/Volunteer_Images/PriyaShivaPrakash.webp";
import Navyashree from "../assets/AboutUsPics/Volunteer_Images/Navyashree.webp";
import Manjunath from "../assets/AboutUsPics/Volunteer_Images/ManjunathBhaskar.webp";
import Sukeerthi from "../assets/AboutUsPics/Volunteer_Images/SukeerthiManohar.webp";
import Pravalika from "../assets/AboutUsPics/Volunteer_Images/PravalikaPramod.webp";

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

  const patronsData = [
    {
      name: "P.V.Maiya",
      image: pvMaiya,
      link: "https://linkedin.com/in/pvmaiya",
      isCircular: false, // rectangular image
    },
    {
      name: "Sridhar Rajagopalan",
      image: sridhar,
      link: "https://linkedin.com/in/sridhar",
      isCircular: true, // circular image
    },
    {
      name: "Mohan Rao",
      image: Mohan,
      link: "https://linkedin.com/in/vijaya",
      isCircular: true, // circular image
    },
    {
      name: "Jagannath Kamath",
      image: Jagannath,
      link: "https://linkedin.com/in/vijaya",
      isCircular: true, // circular image
    },
    {
      name: "Vasundhara Sukeerthi",
      image: Vasundhara,
      link: "https://linkedin.com/in/vijaya",
      isCircular: true, // circular image
    },
    {
      name: "Vijaya Shenoy",
      image: vijaya,
      link: "https://linkedin.com/in/vijaya",
      isCircular: true, // circular image
    },
  ];

  const volunteersData = [
    {
      name: "David Pfister",
      image: david,
      link: "https://linkedin.com/in/david-pfister",
    },
    {
      name: "Marcel Zbinden",
      image: marcel,
      link: "https://linkedin.com/in/marcel-zbinden",
    },
    {
      name: "Tobias,Alayne & Lukas",
      image: Tobias,
      link: "https://linkedin.com/in/pravalika",
    },
    {
      name: "Priya ShivaPrakash",
      image: Priya,
      link: "https://linkedin.com/in/david-pfister",
    },
    {
      name: "Navyashree P.",
      image: Navyashree,
      link: "https://linkedin.com/in/marcel-zbinden",
    },
    {
      name: "Manjunath & Bhaskar",
      image: Manjunath,
      link: "https://linkedin.com/in/navyashree",
    },
    {
      name: "Sukeerthi Manohar",
      image: Sukeerthi,
      link: "https://linkedin.com/in/pravalika",
    },
    {
      name: "Pravalika Pramod",
      image: Pravalika,
      link: "https://linkedin.com/in/pravalika",
    },
  ];

  return (
    <>
      <AboutHero />
      <AboutInspiration />
      <GuidingSpirit />
      <Trustees trustees={trusteesData} />
      <AdvisoryBoard
        members={advisoryMembers}
        backgroundImage={AdvisoryBgImage}
      />
      <Patrons patrons={patronsData} />
      <Volunteers
        volunteers={volunteersData}
        backgroundImage={VolunteerBgImage}
      />
    </>
  );
};

export default About;
