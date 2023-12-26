/* eslint-disable react/no-unescaped-entities */
'use client';
import womenSliderImage from '@/public/images/carousel/women-slider-image.jpg';
import menSliderImage from '@/public/images/carousel/men-slider-image.jpg';
import electronicSliderImage from '@/public/images/carousel/electronics-slider-image.jpeg';
import Image from 'next/image';

import image1 from '@/public/images/home/home3.jpeg';
import image4 from '@/public/images/home/home4.jpeg';
import image5 from '@/public/images/home/home5.jpg';
import image8 from '@/public/images/home/home8.jpg';
import image9 from '@/public/images/home/home9.jpg';
import image10 from '@/public/images/home/home10.jpg';

import image6 from '@/public/images/home/home6.jpg';
import image7 from '@/public/images/home/home7.jpg';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation';
import Masonry from '@mui/lab/Masonry';

const MainSection = () => {
  const router = useRouter();

  const handleClick = (url: string) => {
    // router.push(url);
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
                <div className="transparent-gradient">
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

  const Section2 = () => (
    <div className="flex justify-center items-center h-full w-full bg-[var(--testColor)]">
      <div className="w-[40%] p-10 flex flex-col justify-between items-center">
        <div className="w-[50%] flex justify-center items-center">
          <h1 className="text-white text-[100px] w-full leading-[100px] uppercase table-caption">
            {['keep', 'it', 'classy'].map((i, index) => (
              <span key={index} className="block">
                {i}
              </span>
            ))}
          </h1>
        </div>
        <div className="w-[50%]">
          <h1 className="text-white text-[70px] w-[10%] leading-[90px] uppercase table-caption">
            25% off
          </h1>
        </div>
        <div className="w-full text-right">
          <a className="text-white uppercase hover:underline" href="/discount">
            Check Out now
          </a>
        </div>
      </div>
      <div className="w-[60%] relative h-full overflow-hidden">
        <span className="upper-gradient"></span>
        <span className="lower-gradient"></span>
        <div className="w-full masonry justify-center items-center">
          <Masonry columns={2} spacing={1}>
            <figure className="relative w-[300px]">
              <Image src={image1} alt="image" />
            </figure>
            <figure className="relative w-[300px]">
              <Image src={womenSliderImage} alt="image" />
            </figure>
            <figure className="relative w-[300px]">
              <Image src={image4} alt="image" />
            </figure>
            <figure className="relative w-[300px]">
              <Image src={image5} alt="image" />
            </figure>
            <figure className="relative w-[300px]">
              <Image src={image8} alt="image" />
            </figure>
            <figure className="relative w-[300px]">
              <Image src={image9} alt="image" />
            </figure>
            <figure className="relative w-[300px]">
              <Image src={womenSliderImage} alt="image" />
            </figure>
            <figure className="relative w-[300px]">
              <Image src={image1} alt="image" />
            </figure>
            <figure className="relative w-[300px]">
              <Image src={image5} alt="image" />
            </figure>
            <figure className="relative w-[300px]">
              <Image src={image4} alt="image" />
            </figure>
          </Masonry>
        </div>
      </div>
    </div>
  );

  const Section3 = () => {
    return (
      <div className="bg-[var(--testColor)] flex justify-center items-center w-full h-full">
        <div className='w-[50%] h-full '>
          <figure className="relative w-[60%] h-[60%]">
            <Image src={image6} alt="image" fill />
          </figure>
        </div>
        <div className='w-[50%] h-full'>
          <figure className="relative w-[60%] h-[70%]">
            <Image src={image7} alt="image" layout="fill" />
          </figure>
        </div>
      </div>
    );
  };

  return (
    <main className="main-section">
      <div className="relative flex w-full h-screen">
        <HeaderCarousel />
      </div>
      <div
        style={{
          padding: '10px',
          background: 'var(--testColor)',
          height: '100vh',
        }}
      >
        <Section2 />
      </div>
      {/* <div className="w-screen h-screen">
        <Section3 />
      </div> */}
    </main>
  );
};

export default function Home() {
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
