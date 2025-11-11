import { useState } from "react";
import { Link } from "react-router-dom";
import VolunteerButton from "./VolunteerButton";
import logo from "../../../public/Logo.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Our Programs", to: "/programs" },
    { label: "Sulabh App", to: "/sulabh" },
    // { label: "Events", to: "/events" }, // Uncomment and implement if needed
    { label: "About Us", to: "/about-us" },
    { label: "Contact Us", to: "/contact-us" },
    { label: "Donate", to: "/donate" },
    // { label: "More", to: "/more" }, // Uncomment and implement if needed
  ];

  return (
    <header className="bg-orange-400! sticky! top-0! z-50! shadow-sm!">
      {/* Main Header Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 !mx-10 sm:mx-8 lg:mx-12">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 lg:gap-8">
          {/* Logo */}
          <div className="shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="h-14 w-14 sm:h-16 sm:w-16 lg:h-[70px] lg:w-[70px] rounded-full object-cover border-2 sm:border-4 border-white shadow-md"
            />
          </div>

          {/* Desktop & Tablet Navigation - Shows on tablets (768px+) and larger */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="text-white text-[14px] xl:text-[16px] 2xl:text-[17px] font-medium hover:text-orange-100 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Volunteer Button - Shows on tablets and larger */}
          <div className="hidden lg:flex shrink-0">
            <VolunteerButton onClick={() => console.log("Volunteer clicked")} />
          </div>

          {/* Mobile Menu Button - Only shows on phones (< 1024px) */}
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

      {/* Mobile Menu - Only shows on phones (< 1024px) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-orange-400 border-t border-orange-300 shadow-inner">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
            <nav className="flex flex-col gap-1 py-3">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-white text-sm sm:text-base font-medium hover:bg-orange-500 active:bg-orange-600 transition-colors px-3 py-2.5 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-2 px-3">
                <VolunteerButton
                  onClick={() => {
                    console.log("Volunteer clicked");
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-center"
                />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
