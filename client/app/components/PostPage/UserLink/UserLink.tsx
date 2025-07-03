"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function UserLink({ name, id }: { name: string; id: string }) {
  const { user } = useAuth();

  const isAuthor = user?._id === id;

  return (
    <Link href={isAuthor ? "/profile" : `/user/${id}`}>
      <b>{name}</b>
    </Link>
  );
}
