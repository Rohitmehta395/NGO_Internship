import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Event from "./pages/Event";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Partners from "./pages/Partners";
import Testimonial from "./pages/Testimonial";
import Sulabh from "./pages/Sulabh";
import Programs from "./pages/Programs";
import JnanshalaPage from "./pages/JnanshalaPage";
import SharadaAcademyPage from "./pages/SharadaAcademyPage";
import ProjectSulabhPage from "./pages/ProjectSulabhPage";
import OtherProgramsPage from "./pages/OtherProgramsPage";
import Notfound from "./pages/notfound";

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Event />} />
            <Route path="/about" element={<About />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/testimonials" element={<Testimonial />} />
            <Route path="/app" element={<Sulabh />} />
            <Route path="/programs">
              <Route index element={<Programs />} />
              <Route path="jnanashala" element={<JnanshalaPage />} />
              <Route path="sharada-academy" element={<SharadaAcademyPage />} />
              <Route path="project-sulabh" element={<ProjectSulabhPage />} />
              <Route path="others" element={<OtherProgramsPage />} />
            </Route>
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Layout>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
