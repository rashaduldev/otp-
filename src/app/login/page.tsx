"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api"; // or axios/fetch
import Link from "next/link";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // get email from query string
  const emailFromQuery = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromQuery);
  const [password, setPassword] = useState("");

  // If you want to update email if query changes dynamically
  useEffect(() => {
    if (emailFromQuery) setEmail(emailFromQuery);
  }, [emailFromQuery]);

  const handleLogin = async () => {
    try {
      const res = await api.post("/customer-login", { email, password });
      const { access_token, customer } = res.data;

      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("customer", JSON.stringify(customer));
        alert("📩 Login successful!");
        router.push(`/customer`);
      } else { 
        alert("📩 OTP sent to your email!");
        router.push(`/otp?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors px-4">
      <div className="shadow-2xl p-10 rounded-3xl w-full max-w-md bg-white dark:bg-gray-800 transition-colors">
        {/* Title & Subtitle */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Login to your account to continue
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-300 text-sm">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
