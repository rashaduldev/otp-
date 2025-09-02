"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function OtpVerify() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    try {
      const res = await api.post("/verify-otp", { email, otp });
      alert(res.data.message);
      router.push("/");
    } catch (err) {
      alert("❌ OTP verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white shadow-md p-8 rounded-lg w-96">
        <h1 className="text-xl font-bold mb-4">Enter OTP</h1>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          className="w-full border p-2 mb-3 rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700"
          onClick={handleVerify}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
