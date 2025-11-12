import React, { useState, useRef, useEffect } from "react";
import "../../../styles/VideoTestimonial.css";

const VideoTestimonials = () => {
  const [expanded, setExpanded] = useState(null);
  const carouselRef = useRef(null);

  const videos = [
    {
      id: 1,
      name: "Ms Shwetha",
      title: "Benefited from “Spoken English” course",
      description:
        "Watch this short video by Ms. Shwetha P.S., Teacher of Govt Model Primary School - Sathanuru. She was the top rated student from our “Online Spoken English course for Govt. School Teachers” batch held in April-May 2024. She is also an important member of the Core User Group, involved in testing and deploying the Sulabh App at her school. More such Shwethas in Government schools are needed to generate a favourable impact among the student community in rural India. These educators have the potential to significantly improve our existing education system 👏👏",
      ytLink: "https://www.youtube.com/embed/yAewD7DN-Us",
    },
    {
      id: 2,
      name: "Monika",
      title: "Benefited from “Spoken English” course",
      description:
        "This is Monika V., one of the students of our “Spoken English” online course. She hails from a small town called Vijayapura (70 kms from Bangalore), who is studying Science in a local Government College. Look how confidently and fluently she speaks English. There is no dearth of talent in rural or semi-urban areas of India and with the right support and encouragement, they can compete with the best. Hats off to Monika, who has proved that given an opportunity, any barrier can be broken to emerge as a champion in the digital world! She definitely has a bright future ahead 👍",
      ytLink: "https://www.youtube.com/embed/T9dAYuv8cFQ",
    },
    {
      id: 3,
      name: "With Dr Tejaswini",
      title: "How Mentorship helped Monisha",
      description:
        "Watch this video created by young Monisha, a student of Aeronautical Engineering in Bangalore, who benefited from the Mentorship program ",
      ytLink: "https://www.youtube.com/embed/6LTv6Xo8-0Q",
    },
    {
      id: 4,
      name: "Happy World Foundation",
      title: "Feedback from rural kids",
      description:
        "Rural kids from Kottagalu Village share their feedback on Project JnanaShala, that bridged the digital divide during the pandemic",
      ytLink: "https://www.youtube.com/embed/qS6QpIshwRk",
    },
  ];

  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = direction === "left" ? -450 : 450;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  //  Auto-scroll effect
  useEffect(() => {
    if (videos.length > 3) {
      const interval = setInterval(() => {
        scroll("right");
      }, 4000); // every 4 seconds
      return () => clearInterval(interval);
    }
  }, [videos.length]);

  const toggleReadMore = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section className="video-testimonials">
      <h2 className="section-heading">Video Testimonials</h2>
      <p className="section-sub">Real voices. Real impact.</p>

      <div className="carousel-container">
        {videos.length > 2 && (
          <button className="arrow left" onClick={() => scroll("left")}>
            &#8249;
          </button>
        )}

        <div
          className="video-carousel"
          ref={carouselRef}
          style={{
            justifyContent: videos.length < 3 ? "center" : "flex-start",
          }}
        >
          {videos.map((v) => {
            const isExpanded = expanded === v.id;
            const truncatedDesc =
              v.description.length > 160 && !isExpanded
                ? v.description.slice(0, 160) + "..."
                : v.description;

            return (
              <div className="video-card" key={v.id}>
                <div className="video-wrapper">
                  <iframe
                    src={v.ytLink}
                    title={v.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="video-content">
                  <h3 className="video-name">{v.name}</h3>
                  <p className="video-title">{v.title}</p>
                  <p className="video-desc">{truncatedDesc}</p>
                  {v.description.length > 160 && (
                    <button
                      className="read-more-btn"
                      onClick={() => toggleReadMore(v.id)}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {videos.length > 2 && (
          <button className="arrow right" onClick={() => scroll("right")}>
            &#8250;
          </button>
        )}
      </div>
    </section>
  );
};

export default VideoTestimonials;
