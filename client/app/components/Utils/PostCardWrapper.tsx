"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import styles from "../UI/PostCard/PostCard.module.scss";

const HoverContext = createContext<boolean>(false);

export const useHover = () => useContext(HoverContext);

interface PostCardWrapperProps {
  postId: string;
  children: React.ReactNode;
}

export default function PostCardWrapper({
  postId,
  children,
}: PostCardWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HoverContext.Provider value={isHovered}>
      <Link
        href={`/post/${postId}`}
        className={styles.anunt}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Link>
    </HoverContext.Provider>
  );
}
