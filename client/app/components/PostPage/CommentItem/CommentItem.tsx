"use client";

import styles from "./CommentItem.module.scss";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import UserLink from "../UserLink/UserLink";
import { Post } from "@/types/Post";

interface Props {
  comment: Post["comments"][number];
  timeAgo: string;
}

export default function CommentItem({ comment, timeAgo }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className={styles.comment}>
      <div className={styles.commentinfo}>
        <div className={styles.author}>
          <Image
            src={comment.author?.profileImage || "/icons/user-icon.svg"}
            alt="Profile Icon"
            width={25}
            height={25}
          />
          {comment.author ? (
            <UserLink name={comment.author.name} id={comment.author._id} />
          ) : (
            <b className={styles.deleted}>Utilizator șters</b>
          )}
        </div>
        <p>{timeAgo}</p>
      </div>
      <p>
        {comment.content} Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Saepe, vel autem officia, eum nemo veritatis numquam dolorum
        temporibus reprehenderit hic rem consequatur nobis expedita nam
        voluptate obcaecati in, enim mollitia? asda da da da sd ad21
      </p>

      <div className={styles.optionswrapper} ref={menuRef}>
        <button
          className={styles.optionsbutton}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Image
            src="/icons/options.svg"
            alt="Options"
            width={15}
            height={15}
          />
        </button>

        {menuOpen && (
          <div className={styles.menu}>
            <button className={styles.menuitem}>Raportează</button>
            <button className={styles.menuitem}>Șterge</button>
          </div>
        )}
      </div>
    </div>
  );
}
