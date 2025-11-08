import React, { useState } from "react";
import { Heart, ChevronDown, ChevronRight } from "lucide-react";
import volunteerBackgroundImage from "../../assets/volunteer.webp";

export default function VolunteerComponent() {
  const [expandedSection, setExpandedSection] = useState("");

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left side - Image */}
          <div className="relative p-8 md:p-12 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl transform rotate-2"></div>
              <div className="relative bg-white p-2 rounded-2xl">
                <img
                  src={volunteerBackgroundImage}
                  alt="Young volunteers in front of educational board"
                  className="rounded-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-orange-500 mb-3">
                <Heart className="w-6 h-6 fill-current" />
                <span className="font-semibold text-lg">Join us</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Why We Need You Become a Volunteer
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                We need more Volunteers like these inspiring youngsters — eager
                to create real change in the world!
                <br />
                <span className="font-semibold">
                  Young, Driven & Making a Difference!
                </span>
              </p>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              {/* Recognition and Fulfillment */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("recognition")}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={`text-xl font-semibold ${
                      expandedSection === "recognition"
                        ? "text-orange-500"
                        : "text-gray-900"
                    }`}
                  >
                    Recognition and Fulfillment
                  </span>

                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${
                      expandedSection === "recognition"
                        ? "transform rotate-180 text-orange-500"
                        : ""
                    }`}
                  />
                </button>
                {expandedSection === "recognition" && (
                  <div className="px-5 pb-5 pt-2">
                    <p className="text-gray-700 leading-relaxed">
                      We need more passionate change makers like them - young
                      minds ready to roll up their sleeves and shape a more
                      inclusive, empowered future for education in India.
                    </p>
                  </div>
                )}
              </div>

              {/* Why Join Us as a Volunteer */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("why-join")}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={`text-xl font-semibold ${
                      expandedSection === "why-join"
                        ? "text-orange-500"
                        : "text-gray-900"
                    }`}
                  >
                    Why Join Us as a Volunteer?
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${
                      expandedSection === "why-join"
                        ? "transform rotate-180 text-orange-500"
                        : ""
                    }`}
                  />
                </button>
                {expandedSection === "why-join" && (
                  <div className="px-5 pb-5 pt-2">
                    <p className="text-gray-700 leading-relaxed">
                      Make a tangible impact on education, develop leadership
                      skills, connect with like-minded changemakers, and be part
                      of a movement that's transforming communities across
                      India.
                    </p>
                  </div>
                )}
              </div>

              {/* Be Part of a Community */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("community")}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={`text-xl font-semibold ${
                      expandedSection === "community"
                        ? "text-orange-500"
                        : "text-gray-900"
                    }`}
                  >
                    Be Part of a Community
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${
                      expandedSection === "community"
                        ? "transform rotate-180 text-orange-500"
                        : ""
                    }`}
                  />
                </button>
                {expandedSection === "community" && (
                  <div className="px-5 pb-5 pt-2">
                    <p className="text-gray-700 leading-relaxed">
                      Join a vibrant network of volunteers who share your
                      passion for education and social change. Together, we
                      create lasting impact and support each other's growth.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
