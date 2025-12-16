import React, { useState } from "react";
import { Heart, ChevronDown } from "lucide-react";
import volunteerBackgroundImage from "../../../assets/volunteer.webp";

export default function VolunteerComponent() {
  const [expandedSection, setExpandedSection] = useState("");

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  return (
    <div className="bg-gray-100 px-4 sm:px-6 md:px-8 py-12">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* ================= LEFT : IMAGE ================= */}
          <div className="relative p-6 sm:p-8 md:p-12 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl rotate-2"></div>
              <div className="relative bg-white p-2 rounded-2xl">
                <img
                  src={volunteerBackgroundImage}
                  alt="Young volunteers in front of educational board"
                  className="rounded-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT : CONTENT ================= */}
          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            {/* -------- Header -------- */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-orange-500 mb-3">
                <Heart className="w-5 h-5 fill-current leading-none" />
                <span className="font-semibold text-lg leading-tight">
                  Join us
                </span>
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Why We Need You Become a Volunteer
              </h1>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                We need more volunteers like these inspiring youngsters — eager
                to create real change in the world!
                <br />
                <span className="font-semibold">
                  Young, Driven & Making a Difference!
                </span>
              </p>
            </div>

            {/* -------- Accordion -------- */}
            <div className="space-y-4">
              {/* Recognition */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("recognition")}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={`text-lg sm:text-xl font-semibold ${
                      expandedSection === "recognition"
                        ? "text-orange-500"
                        : "text-gray-900"
                    }`}
                  >
                    Recognition and Fulfillment
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedSection === "recognition"
                        ? "rotate-180 text-orange-500"
                        : "text-gray-500"
                    }`}
                  />
                </button>

                {expandedSection === "recognition" && (
                  <div className="px-4 sm:px-5 pb-5 pt-2">
                    <p className="text-gray-700 leading-relaxed">
                      We need more passionate change-makers — young minds ready
                      to shape a more inclusive and empowered future for
                      education in India.
                    </p>
                  </div>
                )}
              </div>

              {/* Why Join */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("why-join")}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={`text-lg sm:text-xl font-semibold ${
                      expandedSection === "why-join"
                        ? "text-orange-500"
                        : "text-gray-900"
                    }`}
                  >
                    Why Join Us as a Volunteer?
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedSection === "why-join"
                        ? "rotate-180 text-orange-500"
                        : "text-gray-500"
                    }`}
                  />
                </button>

                {expandedSection === "why-join" && (
                  <div className="px-4 sm:px-5 pb-5 pt-2">
                    <p className="text-gray-700 leading-relaxed">
                      Make a tangible impact on education, develop leadership
                      skills, connect with like-minded changemakers, and be part
                      of a movement transforming communities across India.
                    </p>
                  </div>
                )}
              </div>

              {/* Community */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("community")}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={`text-lg sm:text-xl font-semibold ${
                      expandedSection === "community"
                        ? "text-orange-500"
                        : "text-gray-900"
                    }`}
                  >
                    Be Part of a Community
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedSection === "community"
                        ? "rotate-180 text-orange-500"
                        : "text-gray-500"
                    }`}
                  />
                </button>

                {expandedSection === "community" && (
                  <div className="px-4 sm:px-5 pb-5 pt-2">
                    <p className="text-gray-700 leading-relaxed">
                      Join a vibrant network of volunteers who share your
                      passion for education and social change, creating lasting
                      impact together.
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* -------- End Accordion -------- */}
          </div>
        </div>
      </div>
    </div>
  );
}
