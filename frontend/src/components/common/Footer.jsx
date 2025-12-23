import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaChevronRight,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { useState, useEffect } from "react";
import logo from "/Logo.webp";
import { blogsAPI } from "../../services/api";
import { IMAGE_BASE_URL } from "../../utils/constants";

const Footer = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Fetch recent blogs
  useEffect(() => {
    const loadRecentPosts = async () => {
      try {
        const res = await blogsAPI.getAll();
        // Take only the first 2 posts
        if (res.data && res.data.data) {
          setRecentPosts(res.data.data.slice(0, 2));
        }
      } catch (error) {
        console.error("Failed to load footer posts");
      }
    };
    loadRecentPosts();
  }, []);

  // Handle Subscription
  const handleSubscribe = async () => {
    if (!email) return;
    try {
      await blogsAPI.subscribe(email);
      alert("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      alert(error.response?.data?.message || "Subscription failed");
    }
  };

  const quickLinks = [
    { label: "Our Programs", path: "/programs" },
    { label: "Our Partners", path: "/partners" },
    { label: "Sulabh App", path: "/app" },
    { label: "Events", path: "/events" },
    { label: "About Us", path: "/about" },
  ];

  const socialLinks = [
    {
      icon: FaLinkedinIn,
      url: "https://linkedin.com/company/89561047",
      label: "LinkedIn",
    },
    {
      icon: FaYoutube,
      url: "https://www.youtube.com/c/JnanaShala",
      label: "YouTube",
    },
  ];

  return (
    <footer className="bg-[#0a2540] text-white">
      {/* 🔸 Main Footer Content */}
      <div className="py-8 px-6 sm:px-10 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Logo and Tagline */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="mb-6">
                <img
                  src={logo}
                  alt="Sharada Educational Trust"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white object-contain p-1"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/96x96/ffffff/0a2540?text=Logo";
                    e.currentTarget.onerror = null;
                  }}
                />
              </div>
              <h3 className="text-gray-100 text-lg md:text-xl font-semibold mb-6 leading-tight">
                Empowering Lives Through
                <br />
                Education <span className="text-pink-400">❤️</span>
              </h3>
              <div className="flex gap-3 justify-center lg:justify-start">
                {socialLinks.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="border border-gray-600 rounded p-2.5 text-white 
          hover:bg-orange-400 hover:border-orange-400 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* 2. Quick Links */}
            <div>
              <h3 className="text-lg text-white font-bold mb-6 border-b-2 border-orange-400 pb-2 inline-block">
                Quick Links
              </h3>
              <ul className="space-y-1">
                {quickLinks.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                    >
                      <FaChevronRight className="w-3 h-3 text-orange-400 group-hover:translate-x-1 transition-transform" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Recent Posts */}
            <div>
              <h3 className="text-lg text-white font-bold mb-6 border-b-2 border-orange-400 pb-2 inline-block">
                Recent Posts
              </h3>
              <div className="space-y-4">
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => {
                    const imageUrl = post.image
                      ? post.image.startsWith("http")
                        ? post.image
                        : `${IMAGE_BASE_URL}/${post.image}`
                      : "https://placehold.co/64x64/cccccc/999999?text=Post";

                    const dateStr = new Date(post.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    );

                    return (
                      <div
                        key={post._id}
                        onClick={() => navigate(`/blog/${post.slug}`)} // Navigate on click
                        className="flex gap-3 group cursor-pointer"
                      >
                        <img
                          src={imageUrl}
                          alt={post.title}
                          className="w-14 h-14 rounded object-cover flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/64x64/cccccc/999999?text=Post";
                          }}
                        />
                        <div className="flex flex-col">
                          <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">
                            {dateStr}
                          </p>
                          <span className="text-xs font-semibold text-gray-200 group-hover:text-orange-400 transition-colors line-clamp-1">
                            {post.title}
                          </span>
                          {/* Short Description: Truncated to 2 lines max */}
                          <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-snug group-hover:text-gray-300 transition-colors">
                            {post.description || "Click to read more..."}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 text-sm">
                    No recent posts found.
                  </p>
                )}
              </div>
            </div>

            {/* 4. Contact Us */}
            <div>
              <h3 className="text-lg text-white font-bold mb-6 border-b-2 border-orange-400 pb-2 inline-block">
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Sowmya Springs, Dewan Madhava Rao Road, Basavanagudi,
                    Bengaluru, Karnataka, India
                  </p>
                </div>

                <a
                  href="mailto:info@sharadatrust.org"
                  className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors"
                >
                  <FaEnvelope className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-sm">info@sharadatrust.org</span>
                </a>

                {/* Subscription field */}
                <div className="pt-2">
                  <p className="text-sm text-gray-300 mb-2">
                    Subscribe to our newsletter
                  </p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-l bg-white/10 border border-gray-600 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-400"
                    />
                    <button
                      onClick={handleSubscribe}
                      className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-r transition-colors text-[#0a2540] font-bold"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔸 Bottom Copyright */}
      <div className="bg-orange-400 py-4 px-6 sm:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white text-xs md:text-sm font-medium text-center">
            © 2025 Sharada Educational Trust. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
