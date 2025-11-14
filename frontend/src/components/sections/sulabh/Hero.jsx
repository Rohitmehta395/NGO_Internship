import DiyaImage from "../../../assets/diya.png"

const Hero = () => {
  return (
    <section
      className="relative flex items-center justify-start w-full h-[824px] px-6 sm:px-12 lg:px-[135px] -mt-[80px]"
      style={{
        background:
          `linear-gradient(270deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 79.2%), url(${DiyaImage}) center/cover no-repeat`,
      }}
    >
      <div className="max-w-[700px] text-left flex flex-col gap-10 mb-40">
        <h1
          className="font-teachers font-extrabold text-white! text-[42px] sm:text-[52px] lg:text-[64px] leading-[1.1] mb-6"
          style={{
            textShadow: "0px 4px 12px rgba(0,0,0,0.4)",
          }}
        >
          The Future Is Here,
          <br />
          Discover Sulabh App 2.0!
        </h1>

        <p
          className="font-inter text-[16px] leading-[1.6] mb-10"
          style={{
            color: "rgba(255,255,255,0.85)",
            maxWidth: "480px",
          }}
        >
          Sulabh App (Sharada Universal Learning App for Bharat) is a
          transformative EdTech platform pioneered by Sharada Educational Trust
          in collaboration with Bern University of Applied Sciences (BFH
          University).
        </p>

        <div className="flex gap-8 flex-col ">
          <a
            href="https://sulabh2-frontend-341341131750.europe-west3.run.app/login"
            target="_blank"
          >
            <button className="px-6 py-[10px] bg-orange-400 text-white font-inter font-bold text-[14px] uppercase rounded-full shadow-md hover:shadow-lg hover:bg-[#e96f14] transition-all duration-200 cursor-pointer -mt-10">
              Login
            </button>
          </a>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfCBIpQ7LozFNRrt1i-Bd-lxlTCjHEupUtEuAPVbFxpYG1zag/viewform"
            target="_blank"
          >
            <button className="px-6 py-[10px] bg-orange-400 text-white font-inter font-bold text-[14px] uppercase rounded-full shadow-md hover:shadow-lg hover:bg-[#e96f14] transition-all duration-200 cursor-pointer">
              Register for Project Sulabh
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
