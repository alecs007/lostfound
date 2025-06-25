"use client";

import styles from "./UserPosts.module.scss";
import { useEffect } from "react";
import { usePosts } from "@/context/PostsContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";

interface Post {
  _id: string;
  author: string;
  lostfoundID: string;
  title: string;
  content: string;
  tags?: string[];
  images: string[];
  status: "found" | "lost" | "solved";
  name: string;
  email: string;
  phone: string;
  category: string;
  lastSeen?: Date;
  location: string;
  locationCoordinates: { type: "Point"; coordinates: [number, number] };
  circleRadius: number;
  promoted: {
    isActive: boolean;
    expiresAt?: Date;
  };
  reward?: number;
  views: number;
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export default function UserPosts() {
  const { userPosts, getUserPosts } = usePosts() as {
    userPosts: Post[];
    getUserPosts: () => void;
    loading: boolean;
  };

  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);

  if (userPosts.length === 0) {
    return (
      <div className={styles.emptyposts}>
        Aici vor apărea postările dumneavoastră
      </div>
    );
  }

  return (
    <section className={styles.userposts}>
      {userPosts.map((post) => (
        <div key={post._id} className={styles.postcontainer}>
          <div className={styles.postheader}>
            <div className={styles.infobox}>
              <div className={styles.id}>
                ID: <p>{post.lostfoundID}</p>
              </div>
              <p style={{ margin: "0 5px" }}>|</p>
              <Image
                src="/icons/eye.svg"
                alt="Pictogramă vizualizări"
                width={16}
                height={16}
              />
              <p>{post.views}</p>
            </div>
            <button type="button">Promovează</button>
          </div>
          <div className={styles.post}>
            <div className={styles.images}>
              <Swiper
                modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
              >
                {post.images.map((image, i) => (
                  <SwiperSlide key={i}>
                    <figure className={styles.slide}>
                      <Image
                        src={image}
                        alt={`Imagine ${i}`}
                        fill
                        className={styles.image}
                        sizes="100%"
                        priority={i === 0}
                      />
                    </figure>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.postinfo}>
              <div className={styles.postcontent}>
                <h2>{post.title}</h2>
                <div className={styles.box} style={{ height: "30px" }}>
                  <Image
                    src="/icons/location_pin.svg"
                    alt="Pictogramă locație"
                    width={16}
                    height={16}
                  />
                  <p>{post.location}</p>
                </div>
                <div className={styles.box} style={{ marginBottom: "5px" }}>
                  <Image
                    src="/icons/calendar.svg"
                    alt="Pictogramă calendar"
                    width={16}
                    height={16}
                  />
                  {post.lastSeen ? (
                    <p>
                      {new Date(post.lastSeen).toLocaleString("ro-RO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  ) : (
                    <p style={{ marginLeft: "5px" }}>--</p>
                  )}
                </div>
                <div className={styles.box}>
                  <p>Status:</p>
                  {post.status === "found" && <p>Gasit</p>}
                  {post.status === "lost" && <p>Pierdut</p>}
                  {post.status === "solved" && <p>Rezolvat</p>}
                  <p>|</p>
                  <p>Categorie:</p>
                  <p>{post.category}</p>
                </div>
                <div className={styles.box}>
                  <p>Recompensă:</p>
                  {post.reward ? (
                    <p>{post.reward} RON</p>
                  ) : (
                    <p style={{ marginLeft: "5px" }}>--</p>
                  )}
                </div>
                <div className={styles.box}>
                  <p>Contact:</p>
                  <p>{post.name}</p>
                </div>
                <div className={styles.box}>
                  <p>{post.phone}</p>
                  <p>|</p>
                  <p>{post.email}</p>
                </div>
                <div className={styles.box}>
                  <p>Data postării:</p>
                  <p>{new Date(post.createdAt).toLocaleString("ro-RO")}</p>
                </div>
              </div>
              <div className={styles.buttoncontainer}>
                <button
                  type="button"
                  style={{ borderRight: "1px solid #c4c4c4" }}
                >
                  Șterge
                  <Image
                    src="/icons/delete.svg"
                    alt="Pictogramă ștergere"
                    width={14}
                    height={14}
                  />
                </button>
                <button
                  type="button"
                  style={{ borderRight: "1px solid #c4c4c4" }}
                >
                  Editează
                  <Image
                    src="/icons/edit.svg"
                    alt="Pictogramă editare"
                    width={13}
                    height={13}
                  />
                </button>
                <button type="button">Încheie cazul</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
