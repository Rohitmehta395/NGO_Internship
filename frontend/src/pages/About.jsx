// frontend/src/pages/About.jsx
import React, { useState, useEffect } from "react";
import { membersAPI } from "../services/api";
import { API_BASE_URL, IMAGE_BASE_URL } from "../utils/constants";

import AboutHero from "../components/sections/about/AboutHero";
import AboutInspiration from "../components/sections/about/AboutInspiration";
import GuidingSpirit from "../components/sections/about/GuidingSpirit";
import Trustees from "../components/sections/about/Trustees";
import AdvisoryBoard from "../components/sections/about/AdvisoryBoard";
import Patrons from "../components/sections/about/Patrons";
import Volunteers from "../components/sections/about/Volunteers";
import Arvind from "../components/sections/about/Arvind";
import MemberCarouselSection from "../components/sections/about/MemberCarouselSection"; // Updated Component

//Background Image in Advisory board component
import AdvisoryBgImage from "../assets/advisoryboardmembersbackgroundimage.webp";

//Volunteer Background Image
import VolunteerBgImage from "../assets/AboutUsPics/Volunteer_Images/VolunteerBgImage.webp";

const About = () => {
  // State for dynamic data
  const [members, setMembers] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await membersAPI.getAll();
        setMembers(res.data.data);
      } catch (error) {
        console.error("Failed to fetch members", error);
      }
    };
    fetchMembers();
  }, []);

  // Helper to process image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/400";
    return imagePath.startsWith("http")
      ? imagePath
      : `${IMAGE_BASE_URL}/${imagePath}`;
  };

  // --- Dynamic Data Filtering ---

  // Helper function to map database fields to component props
  const mapMemberData = (member) => ({
    name: member.name,
    image: getImageUrl(member.image),
    link: member.linkedin || "#",
    role: member.role,
    description: member.description,
  });

  const trusteesData = members
    .filter((m) => m.category === "trustee")
    .map(mapMemberData);

  const advisoryMembers = members
    .filter((m) => m.category === "advisor")
    .map(mapMemberData);

  const patronsData = members
    .filter((m) => m.category === "patron")
    .map((m) => ({
      ...mapMemberData(m),
      isCircular: true,
    }));

  const volunteersData = members
    .filter((m) => m.category === "volunteer")
    .map(mapMemberData);

  // New Categories
  const guestSpeakersData = members
    .filter((m) => m.category === "guest-speaker")
    .map(mapMemberData);

  const storytellersData = members
    .filter((m) => m.category === "storyteller")
    .map(mapMemberData);

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

      {/* 1. MargaDarshak Program - Guest Speakers */}
      <MemberCarouselSection
        title="MargaDarshak Program - Guest Speakers"
        members={guestSpeakersData}
      />

      {/* 2. Our passionate Storytellers */}
      <MemberCarouselSection
        title="Our passionate Storytellers"
        members={storytellersData}
      />

      <Arvind />
    </>
  );
};

export default About;
