"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [activePage, setActivePage] = useState("postari");
  const [passwordChangeActive, setPasswordChangeActive] = useState(false);
  const [deleteAccountActive, setDeleteAccountActive] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    try {
      router.push("/");
      setTimeout(() => {
        logout();
      }, 200);
    } catch (err) {
      console.log(err);
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (user?.lostfoundID) {
      navigator.clipboard.writeText(user.lostfoundID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className={styles.profile}>
      <div className={styles.container}>
        <div className={styles.background}></div>
        <div className={styles.content}>
          <div className={styles.content_items}>
            {user?.profileImage && (
              <div className={styles.image}>
                <Image
                  src={user.profileImage}
                  alt="User Profile Icon"
                  fill
                  sizes="100%"
                  priority
                />
              </div>
            )}
            <h1 className={styles.name}>{user?.name}</h1>
          </div>
        </div>
        <div className={styles.info}>
          <p>{user?.email}</p>
          <div className={styles.id} onClick={handleCopy}>
            ID: {user?.lostfoundID}
            <span className={styles.tooltip}>
              {copied ? "Copiat!" : "Copiază!"}
            </span>
          </div>
        </div>
        <div className={styles.membersince}>
          <p>
            Membru Lost & Found din {""}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("ro-RO", {
                  year: "numeric",
                  month: "long",
                })
              : ""}
          </p>
        </div>
        <div className={styles.buttoncontainer}>
          <button className={styles.button}>
            <Image
              src="/icons/add-plus.svg"
              alt="Add Post Icon"
              width={20}
              height={20}
            />
            Adaugă postare
          </button>{" "}
          <button
            className={styles.button}
            style={{
              color: "#f57a4e",
              backgroundColor: "transparent",
            }}
            onClick={handleLogout}
          >
            <Image
              src="/icons/exit.svg"
              alt="Exit Icon"
              width={20}
              height={20}
            />{" "}
            Ieși din cont
          </button>
        </div>
        <div className={styles.posts_and_settings}>
          <div className={styles.menu}>
            <button
              onClick={() => {
                setActivePage("postari");
                setPasswordChangeActive(false);
                setDeleteAccountActive(false);
              }}
              className={activePage === "postari" ? styles.active : ""}
            >
              Postări
            </button>
            <button
              onClick={() => setActivePage("setari")}
              className={activePage === "setari" ? styles.active : ""}
            >
              Setări cont
            </button>
          </div>
          {activePage === "postari" && (
            <div>Aici vor aparea postarile dumneavoastra</div>
          )}
          {activePage === "setari" && (
            <div className={styles.settings_container}>
              <div className={styles.settings}>
                <div
                  className={styles.settingstext}
                  onClick={() => setPasswordChangeActive(!passwordChangeActive)}
                >
                  Schimbare parolă
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Arrow Right Icon"
                    style={passwordChangeActive ? { rotate: "90deg" } : {}}
                    width={20}
                    height={20}
                  />{" "}
                </div>
                <div
                  className={`${styles.settingsform} ${
                    passwordChangeActive ? styles.active : ""
                  }`}
                >
                  <input type="password" placeholder="Parolă veche" />
                  <input type="password" placeholder="Parolă nouă" />
                  <input type="password" placeholder="Confirmă parola" />
                  <button>Salvează</button>
                </div>
              </div>
              <div
                className={styles.settings}
                style={{
                  color: "red",
                  border: "1px solid rgba(255, 0, 0, 0.5)",
                  opacity: "0.7",
                }}
              >
                <div
                  className={styles.settingstext}
                  onClick={() => setDeleteAccountActive(!deleteAccountActive)}
                >
                  Ștergere cont
                  <Image
                    src="/icons/arrow-right-red.svg"
                    alt="Red Arrow Right Icon"
                    style={deleteAccountActive ? { rotate: "90deg" } : {}}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
