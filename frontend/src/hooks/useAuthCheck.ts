"use client";
import { useEffect, useState } from "react";

export interface AuthResult {
  userType?: "seller" | "customer";
  userId?: string;
  errorAuth?: string;
  error?: string;
}

const checkAuth = async (): Promise<AuthResult> => {
  try {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      return { error: "No token found in sessionStorage" };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/auth-check`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || "Failed to authenticate user" };
    }

    return {
      userType: data.userType,
      userId: data.userId,
    };
  } catch {
    return { error: "Network error while checking auth" };
  }
};

export const useAuthCheck = () => {
  const [authResult, setAuthResult] = useState<AuthResult>({});

  useEffect(() => {
    checkAuth().then(setAuthResult);
  }, []);

  return authResult;
};

export default useAuthCheck;