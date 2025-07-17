"use client";

import styles from "./ImageSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useHover } from "../../Utils/PostCardWrapper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageSliderProps {
  images: string[];
  title: string;
  priority?: boolean;
}

export default function ImageSlider({
  images,
  title,
  priority = false,
}: ImageSliderProps) {
  const isHovered = useHover();

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className={styles.swiper}
        style={
          {
            "--swiper-navigation-opacity": isHovered ? "1" : "0",
            "--swiper-pagination-opacity": isHovered ? "1" : "0",
          } as React.CSSProperties
        }
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={`${title} - Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              priority={priority && index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
