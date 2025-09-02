"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors px-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-12 flex flex-col items-center text-center max-w-md w-full transition-colors">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
          🔐 Two-Factor Authentication Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm md:text-base">
          Experience a secure login system with OTP verification and modern UI.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Link
            href="/register"
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 hover:shadow-xl transition-all text-center"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 hover:shadow-xl transition-all text-center"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
