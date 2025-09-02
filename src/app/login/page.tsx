"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { AxiosError } from "axios";

interface CustomerType {
  first_name: string;
  last_name: string;
  email: string;
  image_url?: string | null;
}

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toastRef = useRef(false); // ensures toast only fires once

  const emailFromQuery = searchParams.get("email") || "";
  const toastMessage = searchParams.get("toast");
  const toastType = searchParams.get("type");

  const [email, setEmail] = useState(emailFromQuery);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Update email if query changes dynamically
  useEffect(() => {
    if (emailFromQuery) setEmail(emailFromQuery);
  }, [emailFromQuery]);

  // Show toast from query only once
  useEffect(() => {
    if (toastMessage && !toastRef.current) {
      toastRef.current = true;
      if (toastType === "error") toast.error(toastMessage, { duration: 4000 });
      else if (toastType === "info") toast(toastMessage, { icon: "ℹ️", duration: 4000 });
      else toast.success(toastMessage, { duration: 4000 });
    }
  }, [toastMessage, toastType]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post<{ access_token?: string; customer?: CustomerType }>(
        "/customer-login",
        { email, password }
      );

      const { access_token, customer } = res.data;

      if (access_token && customer) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("customer", JSON.stringify(customer));
        toast.success("Login successfully!", { duration: 4000 });
        router.push("/customer");
      } else {
        router.push(`/otp?email=${encodeURIComponent(email)}`);
      }
    } catch (err: unknown) {
      console.error(err);
      let msg = "❌ Login failed!";

      // Type-safe Axios error handling
      if (err instanceof AxiosError && err.response?.data && typeof err.response.data === "object") {
        const data = err.response.data as { message?: string };
        if (data.message) msg = data.message;
      }

      toast.error(msg, { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors px-4">
      <Toaster position="top-right" reverseOrder={false} />
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
            disabled={loading}
            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
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
