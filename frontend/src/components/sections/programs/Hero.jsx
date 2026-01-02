import programHeroImage from "../../../assets/programHero.webp";

export default function Hero() {
  const handleScroll = () => {
    const element = document.getElementById("next-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex w-full min-h-[90vh] md:h-[95vh] items-center justify-center overflow-hidden bg-black -mt-20">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src={programHeroImage}
          alt="Program Hero Background"
          className="h-full w-full object-cover object-center scale-105"
        />
        {/* Gradient Overlay - Adjusted for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center pt-20">
        {/* Tagline / Sub-header (Optional - adds polish) */}
        <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm opacity-0 animate-fade-up [animation-delay:200ms] fill-mode-forwards">
          Transforming Education
        </span>

        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-7xl opacity-0 animate-fade-up [animation-delay:400ms] fill-mode-forwards font-sans">
          Our Programs
        </h1>

        <p className="mb-10 max-w-2xl text-lg font-medium leading-relaxed text-gray-200 drop-shadow-md sm:text-xl md:text-2xl opacity-0 animate-fade-up [animation-delay:600ms] fill-mode-forwards font-sans">
          Our mission is to empower government school teachers, ensuring the
          entire school ecosystem benefits.
        </p>

        {/* Scroll Button */}
        <button
          onClick={handleScroll}
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white/20 opacity-0 animate-fade-up [animation-delay:800ms] fill-mode-forwards cursor-pointer"
          aria-label="Scroll to next section"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }
        .fill-mode-forwards {
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}
