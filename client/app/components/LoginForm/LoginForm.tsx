"use client";

import styles from "./LoginForm.module.scss";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginForm() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {user && (
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          {user.profileImage && (
            <Image
              src={user.profileImage}
              alt="Profile"
              width={100}
              height={100}
            />
          )}
        </div>
      )}
    </div>
  );
}
