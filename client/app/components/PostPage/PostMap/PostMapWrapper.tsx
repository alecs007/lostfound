"use client";

import dynamic from "next/dynamic";

const PostMap = dynamic(() => import("./PostMap"), { ssr: false });

export default PostMap;
