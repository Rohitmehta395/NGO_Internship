import SchoolSapling from "../assets/schoolSapling.webp";
import TeacherEnglish from "../assets/ruralTeachers.webp";
import GirlEnglish from "../assets/girlEnglish.webp";
import TeacherMargaDarshak from "../assets/teacherMargaDarshak.webp";
import StudentMargaDarshak from "../assets/studentMargaDarshak.webp";
import PrototypeSulabh from "../assets/prototypeSulabh.webp";
import SulabhUniversalLearningApp from "../assets/sulabhUniversalLearningApp.webp";
import FinancialInclusion from "../assets/financialInclusion.webp";
import DonationDesktops from "../assets/donationDesktops.webp";
import DonationLaptops from "../assets/donationLaptops.webp";
import DonationLibraryKits from "../assets/donationLibraryKits.webp";
import LastMileSupport from "../assets/lastMileSupport.webp";
import FinancialLiteracy from "../assets/financialLiteracy.webp";
import MentoringWomenLeaders from "../assets/mentoringWomenLeaders.webp";
import ScholarshipGirl from "../assets/scholarshipGirl.webp";
import StoryYoungKid from "../assets/storyYoungKid.webp";

//Base URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// API Configuration
export const API_BASE_URL = BASE_URL.endsWith("/")
  ? BASE_URL.slice(0, -1)
  : BASE_URL;

export const IMAGE_BASE_URL = API_BASE_URL;

// // Navigation
// export const NAVIGATION_LINKS = [
//   { name: "Home", href: "/" },
//   { name: "Our Programs", href: "#programs" },
//   { name: "Student App", href: "/app" },
//   { name: "Events", href: "/events" },
//   { name: "About Us", href: "/about" },
//   { name: "Contact Us", href: "/contact" },
//   { name: "Donate", href: "/donate" },
// ];

// // Social Media Links
// export const SOCIAL_LINKS = {
//   facebook: "https://facebook.com/youreducation",
//   twitter: "https://twitter.com/youreducation",
//   instagram: "https://instagram.com/youreducation",
//   linkedin: "https://linkedin.com/company/youreducation",
//   youtube: "https://youtube.com/youreducation",
// };

// // Contact Information
// export const CONTACT_INFO = {
//   email: "info@youreducation.org",
//   phone: "+1 (555) 123-4567",
//   address: "123 Education Street, Learning City, LC 12345",
// };

// // Program Categories
// export const PROGRAM_CATEGORIES = {
//   "online-academy": {
//     name: "Online Academy",
//     icon: "📚",
//     color: "bg-blue-500",
//   },
//   "project-salaam": {
//     name: "Project Salaam",
//     icon: "🤝",
//     color: "bg-green-500",
//   },
//   "project-journalism": {
//     name: "Project Journalism",
//     icon: "📰",
//     color: "bg-purple-500",
//   },
//   others: {
//     name: "Others",
//     icon: "🌟",
//     color: "bg-orange-500",
//   },
// };

// // Animation Variants for Framer Motion
// export const ANIMATION_VARIANTS = {
//   fadeInUp: {
//     hidden: { opacity: 0, y: 60 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   },
//   fadeInLeft: {
//     hidden: { opacity: 0, x: -60 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   },
//   fadeInRight: {
//     hidden: { opacity: 0, x: 60 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   },
//   staggerContainer: {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1,
//       },
//     },
//   },
//   scaleIn: {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   },
// };

// // Image URLs (Using Unsplash)
// export const IMAGES = {
//   hero: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop&q=80",

//   programs: [
//     "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=400&h=300&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop&q=80",
//   ],

//   educationForAll: [
//     "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=400&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=400&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=400&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=400&fit=crop&q=80",
//   ],

//   flagship: [
//     "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1581726690015-c9861510d40a?w=400&h=300&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&q=80",
//   ],

//   volunteer:
//     "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=400&fit=crop&q=80",

//   newsletter: [
//     "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop&q=80",
//   ],
// };

// // Stats Data
// export const STATS = {
//   students: "50,000+",
//   certificates: "25,000+",
//   countries: "45+",
//   successRate: "95%",
//   volunteers: "2,500+",
//   hoursContributed: "50K+",
// };

// // Program Data
// export const PROGRAMS_DATA = [
//   {
//     id: 1,
//     title: "SUHRADAM ACADEMY",
//     description:
//       "Course fee is 50rs, for courses you can go in My Course section of website and for subscription process send email on education@gmail.com",
//     icon: "📚",
//     participants: "25k+",
//     color: "bg-blue-500",
//     features: ["Live Classes", "Certificates", "Expert Mentors"],
//   },
//   {
//     id: 2,
//     title: "PROJECT SALAAM",
//     description:
//       "Salaam means building cooperation with different religious people, we address and attempt to solve societal issues",
//     icon: "🤝",
//     participants: "15k+",
//     color: "bg-green-500",
//     features: ["Community Building", "Cultural Exchange", "Peace Education"],
//   },
//   {
//     id: 3,
//     title: "PROJECT JOURNALISM",
//     description:
//       "We Started Journalism where all students can work on social media, news, investigation, event coverage etc",
//     icon: "📰",
//     participants: "8k+",
//     color: "bg-purple-500",
//     features: ["Media Literacy", "Digital Skills", "Ethics Training"],
//   },
//   {
//     id: 4,
//     title: "OTHERS",
//     description:
//       "Course related papers, scholarship, digital and English learnings project and many more helping project undergoing",
//     icon: "⭐",
//     participants: "12k+",
//     color: "bg-orange-500",
//     features: ["STEM Focus", "Creative Arts", "Life Skills"],
//   },
// ];

// // Flagship Programs
// export const FLAGSHIP_PROGRAMS = [
//   {
//     id: 1,
//     title: "Digital Literacy Bootcamp",
//     description:
//       "Comprehensive 12-week program covering essential digital skills for the modern workforce.",
//     image: IMAGES.flagship[0],
//     duration: "12 weeks",
//     participants: "2,500+",
//     rating: 4.9,
//     highlights: [
//       "Career-focused curriculum",
//       "Industry mentorship",
//       "Job placement assistance",
//     ],
//     category: "Professional Development",
//   },
//   {
//     id: 2,
//     title: "Youth Leadership Academy",
//     description:
//       "Empowering young leaders with skills in communication, project management, and social impact.",
//     image: IMAGES.flagship[1],
//     duration: "8 weeks",
//     participants: "1,800+",
//     rating: 4.8,
//     highlights: ["Leadership skills", "Community projects", "Global network"],
//     category: "Leadership",
//   },
//   {
//     id: 3,
//     title: "STEM Innovation Lab",
//     description:
//       "Hands-on science, technology, engineering, and mathematics program with real-world applications.",
//     image: IMAGES.flagship[2],
//     duration: "16 weeks",
//     participants: "3,200+",
//     rating: 4.9,
//     highlights: [
//       "Project-based learning",
//       "Research opportunities",
//       "Innovation challenges",
//     ],
//     category: "STEM",
//   },
//   {
//     id: 4,
//     title: "Creative Arts Workshop",
//     description:
//       "Explore various forms of artistic expression while developing technical and creative skills.",
//     image: IMAGES.flagship[3],
//     duration: "10 weeks",
//     participants: "1,500+",
//     rating: 4.7,
//     highlights: [
//       "Multi-disciplinary approach",
//       "Portfolio development",
//       "Exhibition opportunities",
//     ],
//     category: "Arts",
//   },
// ];

export const AllPrograms = {
  projectJnanashala: [
    {
      type: "image",
      image: FinancialLiteracy,
      title: "Financial Literacy for rural kids",
      description:
        'As part of Project JnanaShala, knowledge of "Financial Literacy" is imparted to the rural Govt. school students either through Storytelling, Drama competition and Quiz.',
    },
    {
      type: "image",
      image: FinancialInclusion,
      title: "Financial Inclusion for rural and urban under-privileged",
      description:
        "Our Financial Literacy programs targeted at the urban under-privileged adults, focuses on creating awareness of various Govt. scheme, to ensure they live a life of dignity. We also target rural kids and their mothers, so that they understand the basics of Finance and also inculcate the habit of saving.",
    },
    {
      type: "image",
      image: LastMileSupport,
      title: "Last mile support to ensure the poor benefit",
      description:
        'More than awareness creation, our program focuses on "last mile" support to the beneficiaries (form filling and applying for various Govt. schemes) in partnership with Financial Institutions like IDBI Bank, SIDBI, etc.',
    },
    {
      type: "image",
      image: DonationLibraryKits,
      title: "Donation of Library Kits to Govt. Schools",
      description:
        "As part of Project JnanaShala, Library-in-Classroom kits are donated to Government schools, sourced from Pratham Books. These books are in English and regional languages covering a wide range of subjects/topics.",
    },
    {
      type: "image",
      image: DonationDesktops,
      title: "Donation of Desktops to Govt. Schools",
      description:
        "Desktop Computers and/or Laptops are donated to Government Primary Schools to enable setting up Digital Libraries and to enable Online courses to the students.",
    },
    {
      type: "image",
      image: DonationLaptops,
      title:
        "Laptop Donation to deserving College Students and Govt. School Teachers",
      description:
        "Lenovo Laptops were donated to a Govt. School Teacher as part of Project Sulabh and a Meritorious College Student.",
    },
    {
      type: "video",
      videoId: "bzEpPOgPYqA",
      title: "STEM Education for Girl students",
      description:
        "As part of Project JnanaShala, Science Lab was setup at a Gurukula near Bangalore, to impart STEM based education to girl students, in partnership with ISPF. The program benefitted more than 80 girl students from Std. 5th to 10th.",
    },
    {
      type: "image",
      image: MentoringWomenLeaders,
      title: "Mentorship & Coaching support to aspiring young Women Leaders",
      description:
        "Mentoring girl students of NSTI on subjects ranging from career and livelihood opportunities to human values. Mentoring Rising Stars - young women from India and South East Asian countries, aspiring to become entrepreneurs or pursue successful career in corporate /social sector through Wedu Global and Katalyst India.",
    },
    {
      type: "image",
      image: ScholarshipGirl,
      title: "Scholarship to meritorious girl students",
      description:
        "Girl students scoring more than 90% marks in SSLC exams, coming from under-privileged background, were given scholarship on 18th June 2022.",
    },
    {
      type: "image",
      image: StoryYoungKid,
      title: "Stories on Values & Character for young kids",
      description:
        "Knowing good moral values such as kindness, appreciation of nature and environment, humility, courage, and compassion at an early age builds a child's character. As part of Project JnanaShala, topics related to Values & Character, Social mores, Caring for Environment etc. is being taught to rural children aged between 5 and 12 through the most effective mode of #Storytelling. So far this initiative has impacted more than 500 children from Kottagalu, Pichanakere, Chiikkakalbalu, Cheeluru (all in Ramanagara District) and Doddabyadarahalli (Mandya District). Currently the short stories are available only in Kannada.",
    },
  ],
  projectSulabh: [
    {
      type: "image",
      image: TeacherEnglish,
      title: "Spoken English for Rural Govt Teachers",
      description:
        "Spoken English is taught Online to Government School Teachers from rural and semi-urban areas of Karnataka.",
    },
    {
      type: "image",
      image: GirlEnglish,
      title: "Spoken English for Under-privileged College Girls",
      description:
        "Spoken English is taught Online to under-privileged College Students (girls) from rural and semi-urban areas of Karnataka.",
    },
    {
      type: "image",
      image: TeacherMargaDarshak,
      title: "MargaDarshak (Soft Skills) for Teachers",
      description:
        "Government School Teachers undergo training on soft skills and communication skills as part of the MargaDarshak Program.",
    },
    {
      type: "image",
      image: StudentMargaDarshak,
      title: "MargaDarshak (Soft Skills) for College Girls",
      description:
        "Under-privileged college students (girls) undergo training on communication and soft skills in the MargaDarshak Program.",
    },
    {
      type: "image",
      image: PrototypeSulabh,
      title: "Prototype of Sulabh App 2.0",
      description:
        "On 19th Feb 2025, a prototype of AI-driven interactive Sulabh App was demonstrated to 10 Government School Teachers from 4 districts in Karnataka, who are currently using the Sulabh App.",
    },
    {
      type: "image",
      image: SulabhUniversalLearningApp,
      title: "Sulabh Universal Learning App",
      description:
        "“Sulabh” (Sharada Universal Learning App for Bharat), developed by Swiss students from BFH University, is targeted at students and teachers from rural areas. The App covers courses such as Spoken English, Soft Skills, Financial Literacy etc., available in both Tutor-Led and Self-Paced modes.",
    },
  ],
  sharadaAcademy: [
    {
      type: "image",
      image: TeacherEnglish,
      title: "Sharada Academy – Govt Teacher English Training",
      description:
        "Sharada Academy delivers online Spoken English to rural government school teachers, strengthening their language and communication skills.",
    },
    {
      type: "image",
      image: GirlEnglish,
      title: "Sharada Academy – College Girls English Training",
      description:
        "Sharada Academy provides under-privileged college girl students in rural and semi-urban areas with online Spoken English training.",
    },
    {
      type: "image",
      image: TeacherMargaDarshak,
      title: "Sharada Academy – MargaDarshak Program for Teachers",
      description:
        "Through the MargaDarshak Program, Sharada Academy helps government school teachers develop soft skills and communication competence.",
    },
    {
      type: "image",
      image: StudentMargaDarshak,
      title: "Sharada Academy – MargaDarshak Program for Students",
      description:
        "Sharada Academy runs soft-skills and communication training for college-going girls via its MargaDarshak initiative.",
    },
  ],
  others: [
    {
      type: "image",
      image: SchoolSapling,
      title: "School Sapling Program",
      description:
        "School Sapling program in Rural Government Schools (Std 5th to 7th).",
    },
    {
      type: "image",
      image: FinancialInclusion,
      title: "Financial Inclusion",
      description:
        "Financial literacy and inclusion efforts targeted at under-privileged communities, raising awareness of government schemes and providing last-mile application support.",
    },
  ],
};
