'use client'
import { useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default PrivateRoute;
