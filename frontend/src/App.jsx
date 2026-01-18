import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Public Pages
import Event from "./pages/Event";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Partners from "./pages/Partners";
import Testimonial from "./pages/Testimonial";
import Sulabh from "./pages/Sulabh";
import Programs from "./pages/Programs";
// Note: Hardcoded page imports (JnanshalaPage, etc.) are removed
// because we are now using the dynamic page for everything.
import DynamicProgram from "./pages/DynamicProgram";
import Notfound from "./pages/Notfound";

// Admin Pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import ScrollToTop from "./components/common/ScrollToTop";

// Wrapper to apply the main Layout (Header/Footer) to public routes
const PublicLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* --- ADMIN ROUTES (No Header/Footer) --- */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>

          {/* --- PUBLIC ROUTES (With Header/Footer) --- */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Event />} />
            <Route path="/about" element={<About />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/testimonials" element={<Testimonial />} />
            <Route path="/app" element={<Sulabh />} />

            {/* --- PROGRAM ROUTES --- */}
            {/* Main list of programs */}
            <Route path="/programs" element={<Programs />} />

            {/* Dynamic Route for ANY program detail page 
                (e.g., /programs/sharada-academy, /programs/new-program) */}
            <Route path="/programs/:slug" element={<DynamicProgram />} />

            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />

            {/* 404 Page */}
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>

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
