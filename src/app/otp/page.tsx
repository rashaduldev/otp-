"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Swal from "sweetalert2";

export default function OtpVerify() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    try {
      const res = await api.post(
        "/customer-verify",
        { email, token, code },
        { withCredentials: true }
      );

      const { message, status } = res.data;

      Swal.fire({
        title: message || "✅ OTP verified successfully!",
        icon: status === 1 ? "success" : "info",
      });

      if (status === 1) {
        // redirect to login page with email as query param
        router.push(`/login?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "❌ OTP verification failed",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg p-10 rounded-2xl w-full max-w-md transition-colors">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          Verify Your OTP
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center text-sm">
          Enter the 6-digit OTP sent to your email:{" "}
          <span className="font-medium">{email}</span>
        </p>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 mb-6"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={handleVerify}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
