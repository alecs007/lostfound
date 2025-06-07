"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  profileImage: string;
  bio: string;
  badges: string[];
  favoritePosts: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      if (data.code === "VALIDATION_ERROR" && data.errors) {
        const messages = data.errors
          .map((e: { message: string }) => e.message)
          .join(", ");
        throw new Error(messages);
      }
      throw new Error(data.message || "Login failed");
    }

    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      if (data.code === "VALIDATION_ERROR" && data.errors) {
        const messages = data.errors
          .map((e: { message: string }) => e.message)
          .join(", ");
        throw new Error(messages);
      }
      throw new Error(data.message || "Register failed");
    }

    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const logout = useCallback(async () => {
    await fetch(`${API_URL}/auth/logout`, { method: "POST" });
    setAccessToken(null);
    setUser(null);
    router.push("/");
  }, [router]);

  const refreshToken = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch(`${API_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        return null;
      }

      const data = await res.json();

      return data.accessToken;
    } catch (error) {
      console.error("Failed to refresh token", error);
      await logout();
      return null;
    }
  }, [logout]);

  const fetchProfile = useCallback(
    async (token: string, retry = true): Promise<void> => {
      if (!token) return;

      const res = await fetch(`${API_URL}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401 && retry) {
        const newToken = await refreshToken();
        if (newToken) {
          return fetchProfile(newToken, false);
        } else {
          setUser(null);
          setAccessToken(null);
          return;
        }
      }
      if (res.status === 404) {
        setUser(null);
        setAccessToken(null);
        return;
      }

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        setUser(null);
        setAccessToken(null);
        throw new Error(data.message || "Failed to fetch profile");
      }
    },
    [refreshToken]
  );

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const initAuth = async () => {
      try {
        const token = await refreshToken();
        if (token) {
          setAccessToken(token);
          await fetchProfile(token);
        }
      } catch (error) {
        console.error("Auth init failed:", error);
        setUser(null);
        setAccessToken(null);
      }

      interval = setInterval(async () => {
        const token = await refreshToken();
        if (token) setAccessToken(token);
      }, 14 * 60 * 1000);
    };

    initAuth();

    return () => clearInterval(interval);
  }, [fetchProfile, refreshToken]);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
