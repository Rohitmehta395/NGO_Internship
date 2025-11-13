const CoreModules = () => {
  const modules = [
    {
      title: "AI-Powered Translator module (APT)",
      description:
        "Enabling real-time translation of speech or text from native languages to English.",
      imgSrc: "https://via.placeholder.com/400x300.png?text=Classroom+View", // Placeholder
    },
    {
      title: "AI-Powered Translator module (APT)",
      description:
        "Enabling real-time translation of speech or text from native languages to English.",
      imgSrc: "https://via.placeholder.com/400x300.png?text=AI+Interface", // Placeholder
    },
    {
      title: "Sulabh App 1.0",
      description:
        "A legacy module focused on helping educators teach the aforementioned subjects to their students.",
      imgSrc: "https://via.placeholder.com/400x300.png?text=Group+Learning", // Placeholder
    },
  ];

  return (
    <section className="w-full px-6 sm:px-12 lg:px-[140px] py-16 lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center gap-6 mb-2">
          <div className="w-[72px] h-[2px] bg-[#1D2130]"></div>
          <h3 className="font-roboto font-bold text-base text-primary-text uppercase tracking-[2px]">
            Sulabh app 2.0
          </h3>
        </div>
        <h2 className="font-roboto font-bold text-2xl sm:text-4xl lg:text-[45px] leading-tight lg:leading-[120%] text-primary-text mb-6 lg:mb-[50px] max-w-[808px] ml-26">
          Sulabh App 2.0 offers 3 core modules:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module 1 - AI-Powered Translator (APT) */}
          <div className="relative rounded-[20px] overflow-hidden aspect-[411/421] group cursor-pointer">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/6d9bcdfc567738dbca2fd3d5163b712192b74d0f?width=822"
              alt="AI-Powered Translator module"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-center">
              <h3 className="font-roboto font-bold text-2xl lg:text-[28px] leading-[150%] text-white mb-4">
                Activity-Based Learning module (ABLE)
              </h3>
              <p className="font-roboto text-base leading-[160%] text-white">
               Engaging students with quizzes that transform learning into a dynamic, hands-on experience.
              </p>
            </div>
          </div>

          {/* Module 2 - AI-Powered Translator (APT) - Duplicate */}
          <div className="relative rounded-[20px] overflow-hidden aspect-[411/421] group cursor-pointer">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/d23b2b6e3f636de449a0342041173af621e54eb6?width=822"
              alt="AI-Powered Translator module"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-center">
              <h3 className="font-roboto font-bold text-2xl lg:text-[28px] leading-[150%] text-white mb-4">
                AI-Powered Translator module (APT)
              </h3>
              <p className="font-roboto text-base leading-[160%] text-white">
                Enabling real-time translation of speech or text from native
                languages to English.
              </p>
            </div>
          </div>

          {/* Module 3 - Sulabh App 1.0 */}
          <div className="relative rounded-[20px] overflow-hidden aspect-[411/421] group cursor-pointer">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/170ec8aea8454acc793f35bebef7a118ad10a73a?width=822"
              alt="Sulabh App 1.0"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-center">
              <h3 className="font-roboto font-bold text-2xl lg:text-[28px] leading-[150%] text-white mb-4">
                Sulabh App 1.0
              </h3>
              <p className="font-roboto text-base leading-[160%] text-white">
                A legacy module focused on helping educators teach the
                aforementioned subjects to their students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreModules;
