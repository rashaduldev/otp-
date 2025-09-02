"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { if } from '../../../.next/server/chunks/ssr/[turbopack]_runtime';
import { log } from "console";

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await api.post(
        "/customer-register",
        formData
      );

      const { message, status, token } = res.data;

      if (status === 1) {
        Swal.fire({ title: message, icon: "success" });
        router.push("/login");
      } else if (status === 2) {
        Swal.fire({ title: message, icon: "info" });
        router.push(
          `/otp?email=${encodeURIComponent(formData.email)}&token=${encodeURIComponent(token)}`
        );
      } else {
        Swal.fire({ title: message, icon: "error" });
      }
    } catch (err) {
      console.error(err);

      // Check if backend returned validation errors
      if (err.response?.data?.errors) {
        const firstError = err.response.data.errors[0];
        Swal.fire({ title: firstError.message, icon: "error" });
      } else {
        Swal.fire({ title: "Registration failed!", icon: "error" });
      }
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors px-4">
      <div className="shadow-2xl p-12 rounded-3xl w-full max-w-2xl bg-white dark:bg-gray-800 transition-colors">
        {/* Title & Subtitle */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Fill in your details to register and start your journey with us
          </p>
        </div>

        {/* First Name & Last Name Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
          />
        </div>

        {/* Other Inputs Stacked */}
        <div className="space-y-4 mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
          />
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-300 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
