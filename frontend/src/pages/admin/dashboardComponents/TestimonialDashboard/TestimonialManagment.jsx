import React, { useState } from "react";
import MediaTestimonialAdmin from "./MediaTestimonialAdmin";
import VideoTestimonialAdmin from "./VideoTestimonialAdmin";
import ScreenshotAdmin from "./ScreenshotAdmin";

const TestimonialsManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState("media");

  const getSubTabClass = (tabName) =>
    `pb-2 px-4 font-semibold cursor-pointer transition-colors ${
      activeSubTab === tabName
        ? "border-b-2 border-orange-500 text-orange-600"
        : "text-gray-500 hover:text-gray-700"
    }`;

  return (
    <div>
      {/* Sub-tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-300 overflow-x-auto">
        <button
          className={getSubTabClass("media")}
          onClick={() => setActiveSubTab("media")}
        >
          Media
        </button>
        <button
          className={getSubTabClass("videos")}
          onClick={() => setActiveSubTab("videos")}
        >
          Videos
        </button>
        <button
          className={getSubTabClass("screenshots")}
          onClick={() => setActiveSubTab("screenshots")}
        >
          Testimonial Letters & Emails
        </button>
      </div>

      {/* Sub-tab content */}
      <div>
        {activeSubTab === "media" && <MediaTestimonialAdmin />}
        {activeSubTab === "videos" && <VideoTestimonialAdmin />}
        {activeSubTab === "screenshots" && <ScreenshotAdmin />}
      </div>
    </div>
  );
};

export default TestimonialsManagement;
