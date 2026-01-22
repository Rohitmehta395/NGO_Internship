import React, { useState, useEffect } from "react";
import { heroImagesAPI } from "../../../services/api";
import { API_BASE_URL } from "../../../utils/constants";
import defaultSulabhHero from "../../../assets/sulabhHero.webp";

const Hero = () => {
  const [bgImage, setBgImage] = useState(defaultSulabhHero);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const { data } = await heroImagesAPI.get("sulabh");
        if (data.success && data.data.imageUrl) {
          setBgImage(`${API_BASE_URL}${data.data.imageUrl}`);
        }
      } catch (error) {
        // Silent failure to default image
      }
    };
    fetchHeroImage();
  }, []);

  return (
    <section className="relative flex items-center w-full min-h-[85vh] lg:min-h-screen px-6 sm:px-12 lg:px-20 -mt-[80px] overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.50) 85%), url(${bgImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full pt-20">
        <div className="max-w-2xl text-left flex flex-col justify-center h-full">
          <h1 className="font-teachers font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-6 drop-shadow-xl">
            The Future Is Here, <br />
            <span className="text-orange-400">Discover Sulabh App 2.0!</span>
          </h1>

          <p className="font-inter text-base sm:text-md lg:text-md leading-relaxed text-gray-200 mb-10 max-w-lg drop-shadow-md text-justify hyphens-auto">
            Sulabh App (Sharada Universal Learning App for Bharat) is a
            transformative EdTech platform pioneered by Sharada Educational
            Trust in collaboration with Bern University of Applied Sciences (BFH
            University).
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <a
              href="https://sulabh2-frontend-341341131750.europe-west3.run.app/login"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-inter font-bold text-sm lg:text-base uppercase tracking-wide rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                Login
              </button>
            </a>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfCBIpQ7LozFNRrt1i-Bd-lxlTCjHEupUtEuAPVbFxpYG1zag/viewform"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-8 py-3 bg-white/10 hover:bg-white text-white hover:text-orange-600 border-2 border-white font-inter font-bold text-sm lg:text-base uppercase tracking-wide rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                Register for Project Sulabh
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
