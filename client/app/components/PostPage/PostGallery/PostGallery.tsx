"use client";

import styles from "./PostGallery.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function PostGallery({ images }: { images: string[] }) {
  return (
    <div className={styles.images}>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className={styles.slide}>
            <figure>
              <Image
                src={src}
                alt={`Imagine ${i}`}
                fill
                sizes="100%"
                priority={i === 0}
              />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
