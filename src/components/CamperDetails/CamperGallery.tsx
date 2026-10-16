"use client";

import { useState } from "react";
import Image from "next/image";
import { A11y, FreeMode, Keyboard, Thumbs } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import type { CamperImage } from "@/types/camper";

export default function CamperGallery({
  name,
  gallery,
}: {
  name: string;
  gallery: CamperImage[];
}) {
  const images = [...gallery].sort((first, second) => first.order - second.order);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[1.26] items-center justify-center rounded-2xl bg-(--inputs) text-(--text)">
        No photos available.
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <Swiper
        aria-label={`${name} photo gallery`}
        className="aspect-[1.26] overflow-hidden rounded-2xl"
        keyboard={{ enabled: true }}
        loop={images.length > 1}
        modules={[A11y, Keyboard, Thumbs]}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id}>
            <Image
              alt={`${name}, photo ${image.order}`}
              className="object-cover"
              fill
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, 50vw"
              src={image.original}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          aria-label={`${name} gallery thumbnails`}
          className="mt-4"
          freeMode
          modules={[A11y, FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          slidesPerView={Math.min(images.length, 4)}
          spaceBetween={16}
          watchSlidesProgress
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  alt={`${name}, photo ${image.order}`}
                  className="object-cover"
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 25vw, 12vw"
                  src={image.thumb}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
