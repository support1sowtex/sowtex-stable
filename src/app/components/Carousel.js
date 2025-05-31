"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import path from 'path';
const Carousel = () => {
  const assetsPath = path.join(process.cwd(), 'app/assets/home/');
  const images = [
   "assets/images/home/slide1.png", // Relative path from `public/`
    "assets/images/home/slide2.png", // Add more images as needed
  ];

  return (<>
 
 <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={false}
      className="w-full h-[400px]"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
   
  </>

  );
};

export default Carousel;
