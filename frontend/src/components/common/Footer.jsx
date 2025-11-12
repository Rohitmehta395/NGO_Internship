import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaChevronRight,
} from "react-icons/fa";
import logo from "/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0a2540] text-white">
      {/* 🔸 Main Footer Content */}
      <div className="py-10 px-6 sm:px-10 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Logo and Tagline */}
            <div className="flex flex-col items-start">
              <div className="mb-4">
                <img
                  src={logo}
                  alt="Sharada Educational Trust"
                  className="w-24 h-24 rounded-full bg-white"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/96x96/ffffff/0a2540?text=Logo";
                    e.currentTarget.onerror = null;
                  }}
                />
              </div>
              <h3 className="text-gray-300 text-xl font-semibold mb-4">
                Empowering Lives Through
                <br />
                Education <span className="text-pink-400">❤️</span>
              </h3>
              <div className="flex gap-3">
                {[FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="border border-gray-600 rounded p-2 text-white hover:bg-orange-400 hover:border-orange-400 transition"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl text-white font-bold mb-4 border-b-2 border-orange-400 pb-2 inline-block">
                Quick Links
              </h3>
              <ul className="mt-1 space-y-1">
                {[
                  "Our Programs",
                  "Sulabh App",
                  "Events",
                  "About Us",
                  "Contact Us",
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-orange-400 transition flex items-center gap-2"
                    >
                      <FaChevronRight className="w-5 h-5 text-gray-400" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div>
              <h3 className="text-xl text-white font-bold mb-4 border-b-2 border-orange-400 pb-2 inline-block">
                Recent Posts
              </h3>
              <div className="mt-1 space-y-3">
                {[1, 2].map((_, i) => (
                  <div key={i} className="flex gap-2">
                    <img
                      src="https://placehold.co/64x64/cccccc/999999?text=Post"
                      alt="Post"
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Oct 10, 2025</p>
                      <a
                        href="#"
                        className="text-xs text-gray-300 hover:text-orange-400 transition block"
                      >
                        Bridging Barriers, Building Futures: Sulabh App 2.0
                        Ignites Learn
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-xl text-white font-bold mb-4 border-b-2 border-orange-400 pb-2 inline-block">
                Contact Us
              </h3>

              <div className="space-y-3 mt-3">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-white mt-1" />
                  <p className="text-gray-300 text-xs">
                    Sowmya Springs, Dewan Madhava Rao Road, <br />
                    Basavanagudi, Bengaluru, Karnataka, India
                  </p>
                </div>

                {/* Email */}
                <a
                  href="mailto:info@sharadatrust.org"
                  className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition"
                >
                  <FaEnvelope className="w-5 h-5 text-white" />
                  info@sharadatrust.org
                </a>

                {/* Optional: subscription field */}
                <div className="flex mt-4">
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="flex-1 px-4 py-2 rounded-l bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <button className="bg-orange-400 hover:bg-orange-600 px-4 py-2 rounded-r transition text-white font-bold">
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔸 Bottom Copyright */}
      <div className="bg-orange-400 py-4 px-6 sm:px-10 lg:px-20">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-4">
          <p className="text-white text-sm">
            © 2025 Sharada Educational Trust. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white hover:underline text-sm">
              Terms & Conditions
            </a>
            <a href="#" className="text-white hover:underline text-sm">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
