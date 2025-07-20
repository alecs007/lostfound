"use client";

import styles from "./PostsSlider.module.scss";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { useRef, useState } from "react";
import { Post } from "@/types/Post";
import PostCard from "../../UI/PostCard/PostCard";

export default function PostsSlider({
  posts,
  uniqueId,
}: {
  posts: Post[];
  uniqueId: string;
}) {
  const swiperRef = useRef<SwiperType>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigationState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    updateNavigationState(swiper);
  };

  const handlePrevClick = () => {
    if (swiperRef.current && !isBeginning) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current && !isEnd) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className={styles.sliderwrapper}>
      <div className={styles.header}>
        <h2>{uniqueId === "1" ? "Pierdute recent" : "Găsite recent"}</h2>
        <div className={styles.sliderbuttons}>
          <button
            onClick={handlePrevClick}
            className={`${styles.navbutton} ${
              isBeginning ? styles.disabled : ""
            }`}
            disabled={isBeginning}
          >
            &#171;
          </button>
          <button
            onClick={handleNextClick}
            className={`${styles.navbutton} ${isEnd ? styles.disabled : ""}`}
            disabled={isEnd}
          >
            &#187;
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, FreeMode]}
        spaceBetween={16}
        slidesPerView="auto"
        freeMode={true}
        grabCursor={true}
        onSwiper={handleSwiper}
        onSlideChange={updateNavigationState}
        onTransitionEnd={updateNavigationState}
        onTouchEnd={updateNavigationState}
        navigation={false}
        loop={false}
        watchSlidesProgress={true}
        breakpoints={{
          320: {
            spaceBetween: 12,
          },
          768: {
            spaceBetween: 16,
          },
          1200: {
            spaceBetween: 20,
          },
        }}
      >
        {posts.length > 0
          ? posts.map((post) => (
              <SwiperSlide key={post._id} className={styles.slide}>
                <PostCard post={post} />
              </SwiperSlide>
            ))
          : Array.from({ length: 6 }, (_, i) => (
              <SwiperSlide
                key={`placeholder-${uniqueId}-${i}`}
                className={styles.slide}
              >
                <div className={styles.anunt}>
                  <div className={styles.noPostsMessage}>
                    Nu există postări disponibile
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}
