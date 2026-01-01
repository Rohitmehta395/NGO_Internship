import React, { useEffect } from "react";

const mediaItems = [
  {
    image:
      "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/Story%20of%20Shwetha-The%20Catalyst%20of%20Change%20in%20Rur.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1200,cg:true",
    title: "Conversations Today",
    source: "TRENDSETTER MEDIA",
    description:
      "“The Catalyst of Change in Rural Education”, published by Conversations Today...",
    date: "31 AUG 2024",
    link: "#",
  },
  {
    image:
      "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/Picture%2022-compressed.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:858,cg:true",
    title: "Wonder Woman Wednesday",
    source: "The Hindu",
    description:
      "Empowering Govt Schools through Project Sulabh...",
    date: "23 Oct 2024",
    link: "#",
  },
  {
    image: "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/Picture%201-c8acfae.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1200,cg:true",
    title: "Prajavani & Vijay Karnataka - Bangalore edition ",
    source: "News18",
    description:
      "News articles published by Prajavani & Vijay Karnataka (BLR) on 16th May 𝟐𝟎𝟐𝟒 about the launch of Sulabh Universal Learning App at Govt. Higher Primary School-Cheeluru village (Kanakapura Taluk) on 15th May 2024",
    date: "16th May 2024",
    link: "#",
  },
  {
    image: "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/Combined%20News%20articles.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1200,cg:true",
    title: "Financial Literacy Programme",
    source: "The Hindu",
    description:
      " News articles published by 𝐓𝐡𝐞 𝐇𝐢𝐧𝐝𝐮 -𝐁𝐚𝐧𝐠𝐚𝐥𝐨𝐫𝐞 𝐞𝐝𝐢𝐭𝐢𝐨𝐧 on 𝟖𝐭𝐡 𝐉𝐚𝐧 𝟐𝟎𝟐𝟒, 𝐊𝐚𝐧𝐧𝐚𝐝𝐚 𝐏𝐫𝐚𝐛𝐡𝐚 - 𝐌𝐲𝐬𝐨𝐫𝐞 𝐞𝐝𝐢𝐭𝐢𝐨𝐧 on 𝟗𝐭𝐡 𝐉𝐚𝐧 𝟐𝟎𝟐𝟒  about the “𝐅𝐢𝐧𝐚𝐧𝐜𝐢𝐚𝐥 𝐋𝐢𝐭𝐞𝐫𝐚𝐜𝐲” event, organised on 𝐒𝐚𝐭 𝟔𝐭𝐡 𝐉𝐚𝐧 𝟐𝟎𝟐𝟒 at 𝐒𝐨𝐧𝐚𝐡𝐚𝐥𝐥𝐢 – 𝐚 𝐭𝐫𝐢𝐛𝐚𝐥 𝐯𝐢𝐥𝐥𝐚𝐠𝐞 𝐢𝐧 𝐇.𝐃. 𝐊𝐨𝐭𝐞 𝐭𝐚𝐥𝐮𝐤 (𝐌𝐲𝐬𝐮𝐫𝐮 𝐝𝐢𝐬𝐭𝐫𝐢𝐜𝐭), by 𝐒𝐡𝐚𝐫𝐚𝐝𝐚 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧𝐚𝐥 𝐓𝐫𝐮𝐬𝐭 in partnership with 𝐌𝐚𝐝𝐢𝐥𝐮 𝐒𝐞𝐯𝐚 𝐓𝐫𝐮𝐬𝐭, attended by 50 rural kids and their parents",
    date: "8th jan 2024",
    link: "#",
  },
];

const MediaTestimonial = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".media-card");

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(
              "opacity-0",
              "translate-y-10"
            );
          }
        }),
      { threshold: 0.2 }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="
        w-full bg-[#fafafa] 
        font-[Poppins] 
        px-[6vw] py-[4vw]
        max-[900px]:px-[4vw]
        max-[600px]:px-0
        box-border
      "
    >
      {/* Heading */}
      <h2
        className="
          font-[Quicksand] text-center font-bold
          text-[#ED9121]
          text-[clamp(1.8rem,2.5vw,2.6rem)]
          mb-12
          max-[600px]:text-[1.6rem]
          max-[600px]:py-6
        "
      >
        Media Coverage
      </h2>

      {/* Grid */}
      <div
        className="
          grid grid-cols-[repeat(2,minmax(300px,1fr))]
          gap-8 w-full
          max-[900px]:grid-cols-1
          max-[900px]:gap-[1.8rem]
          max-[600px]:gap-4
        "
      >
        {mediaItems.map((item, i) => (
          <article
            key={i}
            className="
              media-card
              bg-white
              rounded-[16px]
              overflow-hidden
              shadow-[0_4px_15px_rgba(0,0,0,0.08)]
              transition-all duration-300 ease
              flex flex-col relative
              opacity-0 translate-y-10
              hover:-translate-y-[6px]
              hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)]
              max-[600px]:rounded-none
              max-[600px]:shadow-none
            "
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="
                w-full aspect-[16/9] object-cover
                border-b border-[#eee]
                transition-all duration-400 ease
                group-hover:scale-[1.03]
              "
            />

            {/* Content */}
            <div
              className="
                p-6 flex flex-col flex-grow
                max-[600px]:p-4
              "
            >
              <p className="text-[0.95rem] font-semibold text-[#ED9121] mb-1">
                {item.source}
              </p>

              <p className="text-[0.92rem] text-[#555] leading-[1.5] mb-auto">
                {item.description}
              </p>

              <p className="text-[0.85rem] text-[#999] my-[0.8rem]">
                {item.date}
              </p>

              <a
                href={item.link}
                className="
                  text-[0.9rem] font-semibold
                  text-[#ED9121]
                  transition-colors duration-200
                  hover:text-[#c96f11]
                  self-start
                "
              >
                View Article →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MediaTestimonial;



