import React from "react";
import ImageCard from "../../common/cards/ImageCard";
import DonationButton from "../../common/buttons/OrangeButton";
import BackGroundImage from "../../../assets/Background_Image_EducationForAll.webp";

const EducationForAll = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#FFFBED]">
      {/* Background Image (right side) with curved edge */}
      <div
        className="absolute right-0 top-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BackGroundImage})`,
          clipPath: "ellipse(45% 100% at 100% 50%)",
        }}
      >
        {/* Dark overlay on image */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 px-6 md:px-20 py-16">
        {/* Header Section */}
        <div className="mb-12 md:w-[50%]">
          <h1 className="text-3xl md:text-5xl font-bold text-orange-500 mb-6 tracking-widest">
            #EDUCATION_FOR_ALL
          </h1>
          <DonationButton work="Make Donation" />
        </div>

        {/* Cards Section (Full width) */}
        <div className="mt-16 w-full">
          <ImageCard />
        </div>
      </div>
    </section>
  );
};

export default EducationForAll;
