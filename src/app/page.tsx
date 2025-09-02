import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">🔐 Two-Factor Authentication Demo</h1>
      <div className="space-x-4">
        <Link href="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Register</Link>
        <Link href="/login" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Login</Link>
      </div>
    </div>
  );
}
