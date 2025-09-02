"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast, Toaster } from "react-hot-toast";

export default function OtpVerify() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";
  const toastMessage = searchParams.get("toast");
  const toastType = searchParams.get("type");

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toastRef = useRef(false);

  // Show toast from query string once
  useEffect(() => {
    if (toastMessage && !toastRef.current) {
      toastRef.current = true; // mark as shown
      if (toastType === "error") toast.error(toastMessage, { duration: 4000 });
      else if (toastType === "info") toast(toastMessage, { icon: "ℹ️", duration: 4000 });
      else toast.success(toastMessage, { duration: 4000 });
    }
  }, [toastMessage, toastType]);

  const handleVerify = async () => {
    if (!code.trim()) {
      toast.error("Please enter the OTP", { duration: 3000 });
      return;
    }

    setLoading(true);
    try {
      const res = await api.post<{ status: number }>("/customer-verify", 
        { email, token, code },
        { withCredentials: true }
      );

      const { status } = res.data;

      toast.success("OTP verified successfully!", { duration: 4000 });

      if (status === 1) {
        router.push(`/login?email=${encodeURIComponent(email)}`);
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error("OTP verification failed", { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors px-4">
      <Toaster position="top-right" reverseOrder={false} />
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
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={loading}
          className="w-full border-2 border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 mb-6"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
