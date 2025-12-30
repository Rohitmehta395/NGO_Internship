import { useEffect, useState } from "react";

const OurPartners = () => {
  const partners = [
    {
      id: 1,
      img: "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/2nd%20Banner%20image-Final.jpg/:/rs=w:720",
      name: "Happy World Foundation",
      desc:
        "Founded by Shri Santhosh CV in 2013, Happy World Foundation is one of our premier Partners. We have collaborated with them for School Sapling events and Project JnanaShala — an education-based initiative in rural Karnataka.",
    },
    {
      id: 2,
      img: "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/Rajan%20Sir%20centre%20rounded%20Cover%20image.png/:/rs=w:1200",
      name: "Community Teaching Group - Thane",
      desc:
        "Founded by Shri Varadarajan, with the help of 60+ lady volunteers, the NGO teaches over 500 underprivileged students from Thane slums — covering subjects across English, Hindi, and Marathi mediums.",
    },
    {
      id: 3,
      img: "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/_DSC0129.jpg/:/rs=w:1200,h:600",
      name: "Shubham Karoti Maitreyi Gurukula",
      desc:
        "A residential school for girls from remote areas of Karnataka. Founded by Shri Pramod Kamat, it has been empowering education for over 25 years.",
    },
    {
      id: 4,
      img: "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/WhatsApp%20Image%202022-11-03%20at%201.11.55.jpeg/:/rs=w:1200,h:600",
      name: "Punyatma Prabhakar Sharma Seva Mandal",
      desc:
        "An 80-year-old trust from Igatpuri (MH) supporting children with disabilities through free education, food, and shelter.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === partners.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#f9fafb] text-center text-[#082D50] px-[20px] py-[60px]">
      <h2 className="font-[700] mb-[8px] text-[1.6rem] md:text-[2rem]">
        Our Partners
      </h2>

      <p className="text-[#ED9121] text-[1.1rem] tracking-[0.5px] mb-[40px]">
        Collaboration that fuels impact
      </p>

      {/* slider */}
      <div className="relative max-w-[850px] mx-auto overflow-hidden">
        {partners.map((partner, index) => (
          <div
            key={partner.id}
            className={`
              top-0 left-0 w-full
              transition-opacity duration-[1000ms] ease-in-out
              ${index === current ? "relative opacity-100" : "absolute opacity-0"}
            `}
          >
            <div
              className="
                bg-white text-left overflow-hidden
                rounded-[12px] md:rounded-[16px]
                shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                transition-transform duration-300
                hover:-translate-y-[6px]
              "
            >
              <img
                src={partner.img}
                alt={partner.name}
                className="
                  w-full object-cover
                  h-[220px]
                  md:h-[250px]
                  lg:h-[350px]
                "
              />

              <div className="p-[16px] md:p-[18px] lg:p-[24px]">
                <h3
                  className="
                    font-[700] mb-[10px]
                    text-[1rem]
                    md:text-[1.1rem]
                    lg:text-[1.3rem]
                  "
                >
                  {partner.name}
                </h3>

                <p
                  className="
                    text-[#333] leading-[1.5]
                    text-[0.9rem]
                    md:text-[0.95rem]
                    lg:text-[1rem]
                  "
                >
                  {partner.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="mt-[25px]">
        {partners.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`
              inline-block cursor-pointer
              h-[12px] w-[12px] mx-[5px]
              rounded-full transition-colors duration-300
              ${idx === current ? "bg-[#ED9121]" : "bg-[#ccc]"}
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default OurPartners;

