'use client';
import { createContext, useState } from 'react';
import Products from './Components/Product/Products';
import '@mantine/carousel/styles.css';
import womensCover from '@/public/images/womens-cover.jpg';
import mensCover from '@/public/images/mens-cover.jpeg';
import electronics from '@/public/images/electronics-cover.jpg';
import Image from 'next/image';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type IContext = {
  selectedId: number | string | null;
  setSelectedId: (
    value:
      | string
      | number
      | null
      | ((preVar: number | string | null) => number | string)
  ) => void;
};
export const selectedProduct = createContext<IContext>({} as IContext);

export default function Home() {
  const [selectedId, setSelectedId] = useState<number | null | string>(null);
  const router = useRouter();

  const MainSection = () => {
    const handleClick = (url: string) => {
      router.push(url);
    };

    return (
      <main className="main-section">
        <div
          style={{
            width: '100vw',
            height: '100vh',
          }}
          className="relative flex"
        >
          <Swiper
            className="large-carousel"
            effect="fade"
            loop
            modules={[Autoplay, EffectFade]}
            autoplay={{
              delay: 3000,
            }}
          >
            <SwiperSlide style={{ position: 'relative', background: 'white' }}>
              <div className="relative w-full h-full flex flex-col justify-center items-start z-[1] p-4">
                <motion.div className="flex flex-col items-end w-[45%]">
                  <motion.h1
                    variants={{
                      hidden: { opacity: 0, x: -100 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    initial="hidden"
                    animate="visible"
                    className="text-[50px] capitalize"
                  >
                    explore Mens fashion.
                  </motion.h1>
                  <motion.button
                    variants={{
                      hidden: { opacity: 0, x: -100 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{
                      delay: 0.25,
                    }}
                    initial="hidden"
                    animate="visible"
                    className="large-carousel-btn mr-1"
                  >
                    <p
                      className="text-[var(--army)]"
                      onClick={() => handleClick('/Category/Mens')}
                    >
                      Explore
                    </p>
                  </motion.button>
                </motion.div>
              </div>
              <figure className="absolute right-10 top-10 w-[50%] h-[70%]">
                <Image alt="red" src={mensCover} fill className="rounded-lg" />
              </figure>
            </SwiperSlide>

            <SwiperSlide style={{ position: 'relative', background: 'white' }}>
              <div className="relative w-full h-full flex flex-col justify-center items-end z-[1] p-4">
                <div className="flex flex-col items-start w-[55%]">
                  <h1 className="text-[50px] capitalize ">fresh new start.</h1>
                  <button className="shop-now-btn mr-1">
                    <p onClick={() => handleClick('/Category/Womens')}>
                      Start here
                    </p>
                  </button>
                </div>
              </div>
              <figure className="absolute left-10 top-10 w-[40%] h-[80%]">
                <Image
                  alt="red"
                  src={womensCover}
                  fill
                  className="rounded-lg"
                />
              </figure>
            </SwiperSlide>

            <SwiperSlide style={{ position: 'relative', background: 'white' }}>
              <div className="relative w-full h-full flex flex-col justify-center items-end z-[1] p-4">
                <div className="flex flex-col items-center w-[100%]">
                  <h1 className="text-[50px] capitalize text-white">
                    Discover the Latest Gadgets.
                  </h1>
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
              <figure className="absolute top-0 w-[100%] h-[100%]">
                <Image alt="red" src={electronics} fill />
              </figure>
            </SwiperSlide>
          </Swiper>

          <span className="lower-gradient"></span>
        </div>

        <selectedProduct.Provider value={{ selectedId, setSelectedId }}>
          <div style={{ padding: '10px' }}>
            <Products />
          </div>
        </selectedProduct.Provider>
      </main>
    );
  };

  const FooterSection = () => (
    <footer className="w-[100vw] h-[50vh]">Footer</footer>
  );

  return (
    <>
      <MainSection />
      <FooterSection />
    </>
  );
}
