/* eslint-disable react/no-unescaped-entities */
'use client';
import Products from './Components/Products';
import womenSliderImage from '@/public/images/carousel/women-slider-image.jpg';
import menSliderImage from '@/public/images/carousel/men-slider-image.jpg';
import electronicSliderImage from '@/public/images/carousel/electronics-slider-image.jpeg';
import Image from 'next/image';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const MainSection = () => {
    const handleClick = (url: string) => {
      router.push(url);
    };

    const HeaderCarousel = () => (
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
                    Explore Men's Fashion
                  </h1>
                  <button className="shop-now-btn">
                    <p onClick={() => handleClick('/Category/Men')}>Explore</p>
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
              <div className="relative w-[80%] h-full">
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
                    <p onClick={() => handleClick('/Category/Womens')}>Start</p>
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
                  <div className='transparent-gradient'>
                    <h1 className="text-gradient-transparent text-[50px] capitalize text-white">
                      Discover the Latest Gadgets.
                    </h1>
                  </div>
                  <button className="large-carousel-btn mr-1">
                    <p
                      onClick={() => handleClick('/Category/Electronics')}
                      className="text-white"
                    >
                      Discover
                    </p>
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

    return (
      <main className="main-section">
        <div className="relative flex w-full h-full">
          <HeaderCarousel />
        </div>

        <div style={{ padding: '10px' }}>
          {/* <Products /> */}
        </div>
      </main>
    );
  };

  const FooterSection = () => (
    <footer className="w-[100vw] h-[50vh]">Footer</footer>
  );

  return (
    <>
      <MainSection />
      {/* <FooterSection /> */}
    </>
  );
}
