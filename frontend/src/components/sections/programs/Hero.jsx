import programHeroImage from "../../../assets/programHero.webp"

export default function Hero() {

  const handleScroll = () => {
    const element = document.getElementById("next-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden -mt-[80px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 blur-[1px] brightness-[0.9]"
        style={{
          backgroundImage: `url(${programHeroImage})` // Replace with your image
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

      {/* Content */}
      <div
        className="relative text-center px-6 max-w-3xl animate-fadeUp"
      >
        <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-2xl">
          Our Programs
        </h1>

        <p className="text-gray-200 text-lg md:text-xl mt-5 leading-relaxed drop-shadow-xl">
          Our mission is to empower Govt. School teachers and the entire school benefits.
        </p>

        {/* Scroll Button */}
        <button
          onClick={handleScroll}
          className="mt-10 mx-auto w-12 h-12 flex items-center justify-center rounded-full border border-white/40 hover:border-white bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
