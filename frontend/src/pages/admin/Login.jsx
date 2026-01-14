import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password

  // Login State
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Forgot Password State
  const [resetData, setResetData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(formData);
      localStorage.setItem("token", response.data.data.token);
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
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
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
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 cursor-pointer"
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
                  className="w-full p-2 border rounded"
                  value={resetData.email}
                  onChange={(e) =>
                    setResetData({ ...resetData, email: e.target.value })
                  }
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 cursor-pointer"
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
                  className="w-full p-2 border rounded"
                  value={resetData.otp}
                  onChange={(e) =>
                    setResetData({ ...resetData, otp: e.target.value })
                  }
                  required
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-2 border rounded"
                  value={resetData.newPassword}
                  onChange={(e) =>
                    setResetData({ ...resetData, newPassword: e.target.value })
                  }
                  required
                  minLength={6}
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
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
