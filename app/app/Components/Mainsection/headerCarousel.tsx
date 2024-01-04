import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import womenSliderImage from '@/public/images/carousel/women-slider-image.jpg';
import menSliderImage from '@/public/images/carousel/men-slider-image.jpg';
import electronicSliderImage from '@/public/images/carousel/electronics-slider-image.jpeg';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
export const HeaderCarousel = () => (
  <Swiper
    className="large-carousel"
    effect="fade"
    loop
    modules={[Autoplay, EffectFade]}
    autoplay={{
      delay: 5000,
    }}
  >
    <SwiperSlide
      style={{
        position: 'relative',
        background: '#ece4dd',
      }}
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="relative flex items-center justify-center w-[100%] h-[100%]">
          <div className="flex flex-col items-end justify-center w-full h-full header-carousel-wrapper">
            <div className="mr-[60px] flex flex-col justify-end items-end">
              <h1 className="text-[50px] text-white capitalize ">
                Explore Men&apos;s Fashion
              </h1>
              <button className="shop-now-btn">
                <a href="/Category/Men">Explore</a>
              </button>
            </div>
          </div>

          <div className="relative w-[55%] h-full">
            <figure className="absolute w-full h-full">
              <Image alt="red" src={menSliderImage} fill />
            </figure>
          </div>
        </div>
      </div>
    </SwiperSlide>

    <SwiperSlide
      style={{
        position: 'relative',
        background: '#ece4dd ',
      }}
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="relative flex items-center justify-center w-[100%] h-[100%]">
          <div className="relative w-[90%] h-full">
            <figure className="absolute w-full h-full">
              <Image alt="red" src={womenSliderImage} fill />
            </figure>
          </div>

          <div className="flex flex-col items-start justify-center w-full h-full header-carousel-wrapper">
            <div className="ml-[60px]">
              <h1 className="text-[50px] text-white capitalize ">
                Fresh new start
              </h1>
              <button className="shop-now-btn mr-1">
                <a href="/Category/Womens">Start</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>

    <SwiperSlide style={{ position: 'relative', background: 'black' }}>
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="relative flex items-center justify-center w-[98%] h-[95%]">
          <div className="relative w-full h-full flex flex-col justify-center items-end z-[1] p-4">
            <div className="flex flex-col items-center w-[100%]">
              <div className="transparent-gradient">
                <h1 className="text-gradient-transparent text-[50px] capitalize text-white">
                  Discover the Latest Gadgets.
                </h1>
              </div>
              <button className="large-carousel-btn mr-1">
                <a href="/Category/Electronics" className="text-white">
                  Discover
                </a>
              </button>
            </div>
          </div>
          <figure className="absolute right-0 top-0 w-[60%] h-[90%]">
            <Image alt="red" src={electronicSliderImage} fill />
          </figure>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
);
