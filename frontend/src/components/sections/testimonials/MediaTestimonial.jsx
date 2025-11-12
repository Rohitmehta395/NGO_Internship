import React, { useEffect } from "react";
import "../../../styles/MediaTestimonial.css";

const mediaItems = [
  {
    image: "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/Story%20of%20Shwetha-The%20Catalyst%20of%20Change%20in%20Rur.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1200,cg:true",
    title: "Conversations Today",
    source: "TRENDSETTER MEDIA",
    description:
      "“The Catalyst of Change in Rural Education”, published by Conversations Today (leading Online Magazine focused on the social sector), is the story of Ms Shwetha P.S., a School Teacher at Government Model Primary School - Sathanuru in Ramanagara district of Karnataka. “If you empower a Govt. School Teacher, the entire School benefits”",
    date: "31 AUG 2024 ",
    link: "#",
  },
  {
    image: "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/Picture%2022-compressed.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:858,cg:true",
    title: "Wonder Woman Wednesday",
    source: "The Hindu",
    description:
      "“Empowering Govt Schools through Project Sulabh”, an article published on the “Wonder Woman Wednesday” digital platform. Wonder Woman Wednesday is a digital platform that celebrates the remarkable achievements of women from all walks of life. Every Wednesday, the platform shares captivating stories of women. On Wednesday dated 23rd Oct 2024, Shwetha P.S. featured as the Wonder Woman who empowered Government Schools through Project Sulabh",
    date: "23rd Oct 2024",
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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="media-coverage">
      <h2 className="media-heading">Media Coverage</h2>
      <div className="media-grid">
       {mediaItems.map((item, index) => (
  <div key={index} className="media-card">
    {/* Image */}
    <img src={item.image} alt={item.title} className="media-img" />

    {/* Overlay Title */}
    <h3 className="hover-title">{item.title}</h3>

    {/* Card Content */}
    <div className="media-content">
      <p className="source">{item.source}</p>
      <p className="desc">{item.description}</p>
      <p className="date">{item.date}</p>
      <a href={item.link} className="read-more">
        View Article →
      </a>
    </div>
  </div>
))}

      </div>
    </section>
  );
};

export default MediaTestimonial;
