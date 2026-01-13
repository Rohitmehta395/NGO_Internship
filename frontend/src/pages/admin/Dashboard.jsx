import React, { useState } from "react";
import TeamManagement from "./dashboardComponents/TeamManagement";
import BlogManagement from "./dashboardComponents/BlogManagement";
import EducationImages from "./dashboardComponents/EducationImageManagement";
import EventManagement from "./dashboardComponents/EventManagement";
import TestimonialsManagement from "./dashboardComponents/TestimonialDashboard/TestimonialManagment";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("members");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  const getTabClass = (tabName) => {
    return `pb-2 px-4 font-bold text-lg transition-colors whitespace-nowrap ${
      activeTab === tabName
        ? "border-b-4 border-orange-500 text-orange-600 cursor-pointer"
        : "text-gray-500 hover:text-gray-700 cursor-pointer"
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-red-500 font-medium hover:underline bg-white px-4 py-2 rounded shadow-sm"
          >
            Logout
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-6 border-b border-gray-300 overflow-x-auto">
          <button
            className={getTabClass("members")}
            onClick={() => setActiveTab("members")}
          >
            Team Management
          </button>
          <button
            className={getTabClass("blogs")}
            onClick={() => setActiveTab("blogs")}
          >
            Blog Management
          </button>
          <button
            className={getTabClass("education-images")}
            onClick={() => setActiveTab("education-images")}
          >
            Education Images
          </button>
          <button
            className={getTabClass("events")}
            onClick={() => setActiveTab("events")}
          >
            Events
          </button>
          <button
            className={getTabClass("testimonials")}
            onClick={() => setActiveTab("testimonials")}
          >
            Testimonials
          </button>
        </div>
          

        {/* TAB CONTENT */}
        <div className="animate-fade-in">
          {activeTab === "members" && <TeamManagement />}
          {activeTab === "blogs" && <BlogManagement />}
          {activeTab === "education-images" && <EducationImages />}
          {activeTab === "events" && <EventManagement />}
          {activeTab === "testimonials" && <TestimonialsManagement />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
