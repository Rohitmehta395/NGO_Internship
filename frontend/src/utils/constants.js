// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
