import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
