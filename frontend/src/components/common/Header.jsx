import { useState } from "react";
import { Link } from "react-router-dom";
import WhiteButton from "./buttons/WhiteButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  //--- Scroll to top & Close Menus ---
  const handleNavClick = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    setIsMoreDropdownOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Our Programs", path: "/programs" },
    { name: "Sulabh App", path: "/sulabh" },
    { name: "About Us", path: "/about" },
    { name: "Our Partners", path: "/partners" },
    { name: "Events", path: "/events" },
  ];

  const moreItems = [
    { name: "Testimonials", path: "/testimonials" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header className="bg-orange-400 sticky top-0 z-50 shadow-sm">
      {/* Main Header Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 lg:gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
            onClick={handleNavClick}
          >
            <img
              src="/Logo.webp"
              alt="Logo"
              className="h-14 w-14 sm:h-16 sm:w-16 lg:h-[70px] lg:w-[70px] rounded-full object-cover border-2 sm:border-4 border-white shadow-md"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/70x70/ffffff/0a2540?text=Logo";
                e.currentTarget.onerror = null;
              }}
            />
            <h2 className="hidden sm:block text-white font-medium text-lg lg:text-xl hover:text-orange-100 transition-colors whitespace-nowrap font-serif italic">
              Sharada <br /> Educational Trust
            </h2>
          </Link>

          {/* Desktop & Tablet Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-6 xl:gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={handleNavClick}
                  className="text-white text-[14px] xl:text-[16px] 2xl:text-[17px] font-medium hover:text-orange-100 transition-colors whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}

              {/* More Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsMoreDropdownOpen(true)}
                onMouseLeave={() => setIsMoreDropdownOpen(false)}
              >
                <button className="text-white text-[14px] xl:text-[16px] 2xl:text-[17px] font-medium hover:text-orange-100 transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer">
                  More
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${
                      isMoreDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isMoreDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="w-48 bg-white rounded-lg shadow-lg py-2">
                      {moreItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          onClick={handleNavClick} // Added Scroll Click
                          className="block px-6 py-3 text-orange-500 hover:bg-orange-50 transition-colors text-[15px] font-medium"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Volunteer Button (Desktop only) */}
          <div className="hidden lg:flex shrink-0">
            <WhiteButton
              work="Volunteer"
              path="https://docs.google.com/forms/d/e/1FAIpQLSd26LDpdB_b9Ar3y2-11KLDx_nq3NlJGvwApx3W0hxAwRHATw/viewform"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-orange-500 rounded-lg transition-colors focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-7 sm:h-7"
            >
              {isMenuOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M3 12h18" />
                  <path d="M3 6h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* --- MOBILE NAVIGATION MENU --- */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-orange-400 border-t border-orange-300 ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-white text-lg font-semibold hover:bg-orange-500 px-4 py-3 rounded-xl transition-all active:scale-95"
                onClick={handleNavClick}
              >
                {item.name}
              </Link>
            ))}

            {/* Divider for More section */}
            <div className="h-[1px] bg-orange-300 my-2 mx-4" />

            <div className="flex flex-col gap-2">
              {moreItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="text-orange-100 text-base font-medium hover:bg-orange-500 px-4 py-2 rounded-xl transition-all"
                  onClick={handleNavClick}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Volunteer Button */}
            <div className="pt-6">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSd26LDpdB_b9Ar3y2-11KLDx_nq3NlJGvwApx3W0hxAwRHATw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-white text-orange-500 py-4 rounded-full font-bold shadow-lg active:scale-95 transition-transform"
                onClick={() => setIsMenuOpen(false)}
              >
                Volunteer Now
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
