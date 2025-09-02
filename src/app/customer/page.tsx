"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Customer() {
  const { customer } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("customer");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 max-w-md w-full transition-colors">
        {customer ? (
          <>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {customer.image_url ? (
                  <img
                    src={customer.image_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                    {customer.first_name[0]}{customer.last_name[0]}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {customer.first_name} {customer.last_name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {customer.email}
              </p>
              <div className="w-full border-t border-gray-200 dark:border-gray-700 my-4"></div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-semibold shadow-lg transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 text-center">Loading user info...</p>
        )}
      </div>
    </div>
  );
}
