import { useState, useEffect } from "react";

export default function useAuth() {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCustomer = localStorage.getItem("customer");
      if (storedCustomer) setCustomer(JSON.parse(storedCustomer));
    }
  }, []);

  return { customer };
}
