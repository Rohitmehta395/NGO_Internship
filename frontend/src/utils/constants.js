export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const PROGRAM_CATEGORIES = {
  "online-academy": {
    name: "Online Academy",
    icon: "📚",
    color: "bg-blue-500",
  },
  "project-salaam": {
    name: "Project Salaam",
    icon: "🤝",
    color: "bg-green-500",
  },
  "project-journalism": {
    name: "Project Journalism",
    icon: "📰",
    color: "bg-purple-500",
  },
  others: {
    name: "Others",
    icon: "🌟",
    color: "bg-orange-500",
  },
};

export const NAVIGATION_LINKS = [
  { name: "Home", href: "/" },
  { name: "Our Programs", href: "/programs" },
  { name: "Student App", href: "/app" },
  { name: "Events", href: "/events" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Donate", href: "/donate" },
];

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/youreducation",
  twitter: "https://twitter.com/youreducation",
  instagram: "https://instagram.com/youreducation",
  linkedin: "https://linkedin.com/company/youreducation",
  youtube: "https://youtube.com/youreducation",
};

export const CONTACT_INFO = {
  email: "info@youreducation.org",
  phone: "+1 (555) 123-4567",
  address: "123 Education Street, Learning City, LC 12345",
};

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
};
