import { useState } from "react";
import { Link } from "react-router-dom";
import WhiteButton from "./buttons/WhiteButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Our Programs", path: "/programs" },
    { name: "Sulabh App", path: "/app" },
    { name: "Events", path: "/events" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Donate", path: "/donate" },
  ];

  const moreItems = [
    { name: "Our Partners", path: "/partners" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header className="bg-orange-400 sticky top-0 z-50 shadow-sm">
      {/* Main Header Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 lg:gap-8">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src="/Logo.png"
              alt="Logo"
              className="h-14 w-14 sm:h-16 sm:w-16 lg:h-[70px] lg:w-[70px] rounded-full object-cover border-2 sm:border-4 border-white shadow-md"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/70x70/ffffff/0a2540?text=Logo";
                e.currentTarget.onerror = null;
              }}
            />
          </Link>

          {/* Desktop & Tablet Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-6 xl:gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
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
                <button className="text-white text-[14px] xl:text-[16px] 2xl:text-[17px] font-medium hover:text-orange-100 transition-colors whitespace-nowrap flex items-center gap-1">
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
                          className="block px-6 py-3 text-orange-600 hover:bg-orange-50 transition-colors text-[15px] font-medium"
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
            className="lg:hidden text-white p-2 hover:bg-orange-600 rounded-lg transition-colors"
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

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-orange-400 border-t border-orange-300 shadow-inner">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
            <nav className="flex flex-col gap-1 py-3">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="text-white text-sm sm:text-base font-medium hover:bg-orange-500 active:bg-orange-600 transition-colors px-3 py-2.5 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile More Section */}
              <div className="px-3 py-2">
                <div className="text-white text-sm sm:text-base font-medium mb-2">
                  More
                </div>
                <div className="pl-4 flex flex-col gap-1">
                  {moreItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="text-white text-sm sm:text-base font-medium hover:bg-orange-500 active:bg-orange-600 transition-colors px-3 py-2 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2 px-3">
                <button
                  onClick={() => {
                    console.log("Volunteer clicked");
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-white text-orange-500 px-6 py-2.5 rounded-full font-semibold hover:bg-orange-50 transition-colors"
                >
                  Volunteer
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
