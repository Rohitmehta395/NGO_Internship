import React, { useState, useRef, useEffect } from "react";

const VideoTestimonials = () => {
  const [expanded, setExpanded] = useState(null);
  const carouselRef = useRef(null);

  const videos = [
    {
    id: 1,
    name: "Ms Shwetha",
    title: "Benefited from “Spoken English” course",
    description: "Exactly a year ago, on 𝟏𝟓𝐭𝐡 𝐉𝐮𝐧𝐞 𝟐𝟎𝟐𝟒, we launched the 𝐒𝐮𝐥𝐚𝐛𝐡 𝐀𝐩𝐩 at 𝐆𝐨𝐯𝐭. 𝐏𝐫𝐢𝐦𝐚𝐫𝐲 𝐒𝐜𝐡𝐨𝐨𝐥, 𝐒𝐚𝐭𝐡𝐚𝐧𝐮𝐫𝐮 in Ramanagara District (Karnataka). This year, on 𝐒𝐚𝐭𝐮𝐫𝐝𝐚𝐲, 𝟏𝟒𝐭𝐡 𝐉𝐮𝐧𝐞 𝟐𝟎𝟐𝟓, Sharada Educational Trust returns to the same school, with the same passionate Teacher Ms. 𝐒𝐡𝐰𝐞𝐭𝐡𝐚 𝐏.𝐒, to launch 𝐒𝐮𝐥𝐚𝐛𝐡 𝐀𝐩𝐩 𝟐.𝟎 ... only now, it's in the newly named Bengaluru South District 😊 All thanks to 𝐒𝐡𝐰𝐞𝐭𝐡𝐚 𝐏.𝐒., 𝐒𝐮𝐥𝐚𝐛𝐡 𝟏.𝟎 positively impacted 𝟒𝟎 𝐬𝐭𝐮𝐝𝐞𝐧𝐭𝐬 & 𝟓 𝐭𝐞𝐚𝐜𝐡𝐞𝐫𝐬 at GMPS Sathanuru. This time around, we’ve already onboarded 𝟒𝟎+ 𝐬𝐭𝐮𝐝𝐞𝐧𝐭𝐬 from 𝐂𝐥𝐚𝐬𝐬𝐞𝐬 𝟑 𝐭𝐨 𝟕 from the same school, who are ready to dive into: 🔹 Activity-Based & Visual Learning tools 🔹 Interactive Quizzes 🔹 Fun filled, AI-Powered Translator We’re excited to see many more students join this learning journey in the days ahead! 👏 🎥 Don’t miss 𝐒𝐡𝐰𝐞𝐭𝐡𝐚 𝐏.𝐒's testimonial on 𝐒𝐮𝐥𝐚𝐛𝐡 𝐀𝐩𝐩 𝟐.𝟎, a journey she’s been part of right from the blueprint stage to final user testing! 👍",
    ytLink: "https://www.youtube.com/embed/yAewD7DN-Us",
  },
  {
    id: 2,
    name: "Monika",
    title: "Benefited from “Spoken English” course",
    description: "This is 𝐌𝐨𝐧𝐢𝐤𝐚 𝐕., one of the students of our 𝐒𝐩𝐨𝐤𝐞𝐧 𝐄𝐧𝐠𝐥𝐢𝐬𝐡 online course. She hails from a small town called Vijayapura (70 kms from Bangalore), who is studying Science in a local Government College. A child of a single parent, her mother works as a cook in a local girls' hostel to sustain their livelihood. 𝐋𝐨𝐨𝐤 𝐡𝐨𝐰 𝐜𝐨𝐧𝐟𝐢𝐝𝐞𝐧𝐭𝐥𝐲 𝐚𝐧𝐝 𝐟𝐥𝐮𝐞𝐧𝐭𝐥𝐲 𝐬𝐡𝐞 𝐬𝐩𝐞𝐚𝐤𝐬 𝐄𝐧𝐠𝐥𝐢𝐬𝐡. There is no dearth of talent in the rural or semi-urban areas of India and with the right amount of support and encouragement, they can compete with the best. Hats off to 𝐌𝐨𝐧𝐢𝐤𝐚, who has proved that given an opportunity any barrier can be broken, to emerge as a 𝐜𝐡𝐚𝐦𝐩𝐢𝐨𝐧 𝐢𝐧 𝐭𝐡𝐞 𝐝𝐢𝐠𝐢𝐭𝐚𝐥 𝐰𝐨𝐫𝐥𝐝 ! She definitely has a bright future ahead👍",
    ytLink: "https://www.youtube.com/embed/T9dAYuv8cFQ",
  },
  {
    id: 3,
    name: "Sirisha",
    title: "Benefited from “Spoken English” course from Sulabh App 1.0",
    description: "Watch this young girl student 𝐒𝐢𝐫𝐢𝐬𝐡𝐚 (𝐂𝐥𝐚𝐬𝐬 𝟓𝐭𝐡) from 𝐆𝐨𝐯𝐞𝐫𝐧𝐦𝐞𝐧𝐭 𝐌𝐨𝐝𝐞𝐥 𝐏𝐫𝐢𝐦𝐚𝐫𝐲 𝐒𝐜𝐡𝐨𝐨𝐥 - 𝐒𝐚𝐭𝐡𝐚𝐧𝐮𝐫𝐮 (Ramanagara District), proudly talking about her School, in such 𝐟𝐥𝐮𝐞𝐧𝐭 𝐄𝐧𝐠𝐥𝐢𝐬𝐡 👏 ",
    ytLink: "https://www.youtube.com/embed/ljhxm0cYoUw",
  },
  {
    id: 4,
    name: "Inchana talks",
    title: "Her experience with Financial Literacy Program",
    description: "Meet 𝐈𝐧𝐜𝐡𝐚𝐧𝐚, a bright young learner at 𝐆𝐨𝐯𝐭 𝐏𝐫𝐢𝐦𝐚𝐫𝐲 𝐒𝐜𝐡𝐨𝐨𝐥 - 𝐒𝐚𝐭𝐡𝐚𝐧𝐮𝐫𝐮, as she recounts her journey with the 𝐅𝐢𝐧𝐚𝐧𝐜𝐢𝐚𝐥 𝐋𝐢𝐭𝐞𝐫𝐚𝐜𝐲 program organised by 𝐒𝐡𝐚𝐫𝐚𝐝𝐚 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧𝐚𝐥 𝐓𝐫𝐮𝐬𝐭 at her school in October 2024. Through interactive sessions, she gained valuable insights into saving, budgeting, the process of opening a zero-balance bank account, and the significance of securing insurance.What stood out to her was the program’s creative approach—using storytelling, role-plays, and fun quizzes—to make complex financial concepts relatable and easy to grasp 👍",
    ytLink: "https://www.youtube.com/embed/JlBBhAcaIVI",
  },
  {
    id: 5,
    name: "Bindushree",
    title: "testimonial on Sulabh App 2.0",
    description: "𝐌𝐞𝐞𝐭 𝐭𝐡𝐞 𝐏𝐚𝐬𝐬𝐢𝐨𝐧𝐚𝐭𝐞 𝐂𝐡𝐚𝐧𝐠𝐞𝐦𝐚𝐤𝐞𝐫 𝐁𝐞𝐡𝐢𝐧𝐝 𝐭𝐡𝐞 𝐂𝐡𝐚𝐥𝐤𝐛𝐨𝐚𝐫𝐝 🔬📐Say hello to 𝐌𝐬. 𝐁𝐢𝐧𝐝𝐮𝐬𝐡𝐫𝐞𝐞, a committed Maths & Science teacher from Govt Model Primary School – Sathanuru, who is quietly transforming classrooms in rural India. She successfully completed all three courses mapped to the 𝐀𝐜𝐭𝐢𝐯𝐢𝐭𝐲-𝐁𝐚𝐬𝐞𝐝 𝐋𝐞𝐚𝐫𝐧𝐢𝐧𝐠 (𝐀𝐁𝐋) 𝐦𝐨𝐝𝐮𝐥𝐞 of the 𝐒𝐮𝐥𝐚𝐛𝐡 𝐀𝐩𝐩 𝟐.𝟎 and she didn't stop there.  With curiosity and conviction, she also embraced the 𝐀𝐈-𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐓𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐨𝐫 (𝐀𝐏𝐓) 𝐦𝐨𝐝𝐮𝐥𝐞 to help her students bridge language barriers. Thanks to her proactive involvement and feedback, we’re excited to announce the upcoming launch of two new curriculum modules in Maths and Science, exclusively designed for 𝐒𝐮𝐥𝐚𝐛𝐡 𝐀𝐩𝐩 𝟐.𝟎, with rural learners in mind. Educators like 𝐌𝐬. 𝐁𝐢𝐧𝐝𝐮𝐬𝐡𝐫𝐞𝐞 remind us that real innovation begins in grassroots classrooms!!",
    ytLink: "https://www.youtube.com/embed/iHWjg0oP5Bo",
  },
  {
    id: 6,
    name: "Arvind",
    title: "testimonial to Swiss students",
    description: "Watch this testimonial from the Founder of Sharada Educational Trust for the Swiss students from BFH University, who developed Sulabh App 2.0 in just 2 months !!",
    ytLink: "https://www.youtube.com/embed/9LTCW4vQmFc",
  },
  {
    id: 7,
    name: "Arvind",
    title: "Watch this short video Testimonial of a Volunteer",
    description: "Watch this Testimonial from the Founder of Sharada Educational Trust - Arvind Kamath. In a space of just 2 months, our Volunteer - NavyaShree P., has created a lot of impact among Govt school students from the rural areas of Kanakapura taluk. She has conducted Workshops in areas such as Personal Hygiene, Menstrual Hygiene, Good & Bad Touch, Bad effects of Smoking, Alcohol and Drugs on young kids at a couple of Govt Schools impacting more than 200 kids. 👍",
    ytLink: "https://www.youtube.com/embed/VFli6xFroqg",
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
