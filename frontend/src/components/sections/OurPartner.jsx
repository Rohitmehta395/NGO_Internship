import React, { useEffect, useState } from "react";
import "../../styles/OurPartners.css";

const OurPartners = () => {
  const partners = [
    {
      id: 1,
      img: "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/2nd%20Banner%20image-Final.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:720,cg:true",
      name: "Happy World Foundation",
      desc: "Founded by Shri Santhosh CV in 2013, Happy World Foundation is one of our premier Partners. We have collaborated with them for School Sapling events and Project JnanaShala — an education-based initiative in rural Karnataka.",
    },
    {
      id: 2,
      img: "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/Rajan%20Sir%20centre%20rounded%20Cover%20image.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1200,cg:true",
      name: "Community Teaching Group - Thane",
      desc: "Founded by Shri Varadarajan, with the help of 60+ lady volunteers, the NGO teaches over 500 underprivileged students from Thane slums — covering subjects across English, Hindi, and Marathi mediums.",
    },
    {
      id: 3,
      img: "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/_DSC0129.jpg/:/cr=t:5.87%25,l:0%25,w:100%25,h:75%25/rs=w:1200,h:600,cg:true",
      name: "Shubham Karoti Maitreyi Gurukula",
      desc: "A residential school for girls from remote areas of Karnataka. Founded by Shri Pramod Kamat, it has been empowering education for over 25 years. We proudly support their initiatives.",
    },
    {
      id: 4,
      img: "https://img1.wsimg.com/isteam/ip/72ab1d19-9a70-40bf-8977-a857ec90d38d/WhatsApp%20Image%202022-11-03%20at%201.11.55%20-fa14eee.jpeg/:/cr=t:5.56%25,l:0%25,w:100%25,h:88.89%25/rs=w:1200,h:600,cg:true",
      name: "Punyatma Prabhakar Sharma Seva Mandal",
      desc: "An 80-year-old trust from Igatpuri (MH) supporting children with disabilities through free education, food, and shelter. We assist their ‘Anna Prabandh’ program on special occasions.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === partners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [partners.length]);

  return (
    <section className="partners-section">
      <h2 className="partners-title">Our Partners</h2>
      <p className="partners-subtitle">Collaboration that fuels impact</p>

      <div className="partner-slider">
        {partners.map((partner, index) => (
          <div
            key={partner.id}
            className={`partner-slide ${index === current ? "active" : ""}`}
          >
            <div className="partner-card">
              <img src={partner.img} alt={partner.name} className="partner-img" />
              <div className="partner-text">
                <h3>{partner.name}</h3>
                <p>{partner.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dots">
        {partners.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default OurPartners;
