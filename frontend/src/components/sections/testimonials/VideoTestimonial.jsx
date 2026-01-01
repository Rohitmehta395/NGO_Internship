import React, { useState, useRef, useEffect } from "react";

const VideoTestimonials = () => {
  const [expanded, setExpanded] = useState(null);
  const carouselRef = useRef(null);

  const videos = [
    {
      id: 1,
      name: "Ms Shwetha",
      title: "Benefited from “Spoken English” course",
      description:
        "Watch this short video by Ms. Shwetha P.S., Teacher of Govt Model Primary School - Sathanuru. She was the top rated student from our “Online Spoken English course for Govt. School Teachers” batch held in April-May 2024. She is also an important member of the Core User Group, involved in testing and deploying the Sulabh App at her school.",
      ytLink: "https://www.youtube.com/embed/yAewD7DN-Us",
    },
    {
      id: 2,
      name: "Monika",
      title: "Benefited from “Spoken English” course",
      description:
        "This is Monika V., one of the students of our “Spoken English” online course. She hails from a small town called Vijayapura near Bangalore.",
      ytLink: "https://www.youtube.com/embed/T9dAYuv8cFQ",
    },
    {
      id: 3,
      name: "With Dr Tejaswini",
      title: "How Mentorship helped Monisha",
      description:
        "Watch this video created by young Monisha, a student of Aeronautical Engineering in Bangalore.",
      ytLink: "https://www.youtube.com/embed/6LTv6Xo8-0Q",
    },
    {
      id: 4,
      name: "Happy World Foundation",
      title: "Feedback from rural kids",
      description:
        "Rural kids from Kottagalu Village share their feedback on Project JnanaShala.",
      ytLink: "https://www.youtube.com/embed/qS6QpIshwRk",
    },
  ];

  const scroll = (dir) => {
    const container = carouselRef.current;
    if (!container) return;
    container.scrollBy({
      left: dir === "left" ? -450 : 450,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (videos.length > 3) {
      const id = setInterval(() => scroll("right"), 4000);
      return () => clearInterval(id);
    }
  }, []);

  return (
    <section className="bg-[#fafafa] px-4 py-12 md:px-24 md:py-20 font-[Poppins]">
      {/* Heading */}
      <h2 className="text-center text-2xl md:text-4xl font-bold text-[#ED9121] font-[Quicksand]">
        Video Testimonials
      </h2>
      <p className="text-center text-gray-600 mt-2 mb-10">
        Real voices. Real impact.
      </p>

      {/* Carousel */}
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="flex items-center justify-center
            absolute left-2 md:left-[-25px]
            top-1/2 -translate-y-1/2
            w-9 h-9 md:w-[45px] md:h-[45px]
            rounded-full bg-[#ED9121] text-white text-xl md:text-2xl
            hover:bg-[#c86d00] z-20"
        >
          &#8249;
        </button>

        {/* Cards */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-1
                     scrollbar-hide"
        >
          {videos.map((v) => {
            const isExpanded = expanded === v.id;
            const desc =
              v.description.length > 160 && !isExpanded
                ? v.description.slice(0, 160) + "..."
                : v.description;

            return (
              <div
                key={v.id}
                className="flex-shrink-0 w-[300px] md:w-[380px]
                           bg-white rounded-[14px]
                           shadow-[0_4px_15px_rgba(0,0,0,0.08)]
                           hover:-translate-y-1 hover:shadow-[0_6px_25px_rgba(237,145,33,0.3)]
                           transition-all duration-300 text-left"
              >
                {/* Video */}
                <iframe
                  src={v.ytLink}
                  title={v.name}
                  className="w-full h-[200px] md:h-[220px]
                             rounded-t-[14px] border-b-[3px] border-[#ED9121]"
                  allowFullScreen
                />

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-[Quicksand] text-lg font-semibold text-gray-900 relative inline-block">
                    {v.name}
                  </h3>

                  <p className="text-[#ED9121] font-semibold mt-2">
                    {v.title}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed mt-2">
                    {desc}
                  </p>

                  {v.description.length > 160 && (
                    <button
                      onClick={() =>
                        setExpanded(isExpanded ? null : v.id)
                      }
                      className="mt-2 text-[#ED9121] font-semibold text-sm hover:text-[#c86d00]"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="flex items-center justify-center
            absolute right-2 md:right-[-25px]
            top-1/2 -translate-y-1/2
            w-9 h-9 md:w-[45px] md:h-[45px]
            rounded-full bg-[#ED9121] text-white text-xl md:text-2xl
            hover:bg-[#c86d00] z-20"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default VideoTestimonials;
