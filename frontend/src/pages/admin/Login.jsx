import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../../services/api";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

// Simple Eye Icons as components to avoid external dependencies
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const EyeSlashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

const Login = () => {
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password

  // Toggle states for password visibility
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login State
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Forgot Password State
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(formData);
      sessionStorage.setItem("token", response.data.data.token);
      toast.success("Welcome back, Admin!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Handle Send OTP (Step 1 of Forgot Password)
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await authAPI.forgotPassword(resetData.email);
      toast.success("OTP sent to your email!");
      setStep(2); // Move to OTP verification step
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // Handle Reset Password (Step 2 of Forgot Password)
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (resetData.newPassword !== resetData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const data = {
        email: resetData.email,
        otp: resetData.otp,
        password: resetData.newPassword,
      };
      await authAPI.resetPassword(data);
      toast.success("Password reset successful! Please login.");
      setIsForgotMode(false); // Go back to login
      setStep(1); // Reset step
      // Reset sensitive fields
      setResetData({
        ...resetData,
        otp: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* GO TO HOME LINK */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Go to Home
      </Link>

      <div className="bg-white p-8 rounded-lg shadow-md w-96 animate-fade-in">
        <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">
          {isForgotMode
            ? step === 1
              ? "Forgot Password"
              : "Reset Password"
            : "Admin Login"}
        </h1>

        {!isForgotMode ? (
          // --- LOGIN FORM ---
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Admin Email"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 outline-none"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            {/* Password Field with Eye Toggle */}
            <div className="relative">
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 border rounded pr-10 focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors font-medium cursor-pointer"
            >
              Login
            </button>
            <div className="text-center mt-2">
              <button
                type="button"
                onClick={() => setIsForgotMode(true)}
                className="text-sm text-blue-600 hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        ) : (
          // --- FORGOT PASSWORD FORMS ---
          <>
            {step === 1 ? (
              // Step 1: Enter Email
              <form onSubmit={handleSendOtp} className="space-y-4">
                <p className="text-sm text-gray-600 mb-2">
                  Enter your email to receive an OTP.
                </p>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 outline-none"
                  value={resetData.email}
                  onChange={(e) =>
                    setResetData({ ...resetData, email: e.target.value })
                  }
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  Send OTP
                </button>
              </form>
            ) : (
              // Step 2: Enter OTP & New Password for admin
              <form onSubmit={handleResetPassword} className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 outline-none"
                  value={resetData.otp}
                  onChange={(e) =>
                    setResetData({ ...resetData, otp: e.target.value })
                  }
                  required
                />

                {/* New Password Field with Eye Toggle */}
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full p-2 border rounded pr-10 focus:ring-2 focus:ring-orange-500 outline-none"
                    value={resetData.newPassword}
                    onChange={(e) =>
                      setResetData({
                        ...resetData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>

                {/* Confirm Password Field with Eye Toggle */}
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    className="w-full p-2 border rounded pr-10 focus:ring-2 focus:ring-orange-500 outline-none"
                    value={resetData.confirmPassword}
                    onChange={(e) =>
                      setResetData({
                        ...resetData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors cursor-pointer"
                >
                  Reset Password
                </button>
              </form>
            )}

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsForgotMode(false);
                  setStep(1);
                  setResetData({
                    ...resetData,
                    otp: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                className="text-sm text-gray-500 hover:underline cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
