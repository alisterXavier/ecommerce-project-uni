'use client';
import products from '@/public/productList.json';
import Medium from './Product-type/mid-product';
import Small from './Product-type/small-product';
import { CarouselComp } from './Carousel';
import { SwiperSlide } from 'swiper/react';
import menImage from '@/public/images/categorySection/men-fashion-Category-Cover.jpg';
import womenImage from '@/public/images/categorySection/women-fashion-Category-Cover.jpg';
import electronics from '@/public/images/categorySection/electronics-Category-Cover.jpg';
import { useEffect, useRef, useState } from 'react';
import { useProducts } from '@/shared/hooks/products';
import { SkeletonContainer } from './SkeletonComp';

const Products = () => {
  const { data, productsIsLoading } = useProducts('new');
  const [inView, setInView] = useState<boolean>(false);
  const intersectionObserve = useRef<null | IntersectionObserver>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    intersectionObserve.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.8 }
    );

    if (categoriesRef.current)
      intersectionObserve.current.observe(categoriesRef.current);
  }, []);

  const newArrivals = data?.data.map((product, index) => (
    <SwiperSlide key={index}>
      <Small id={product.id} product={product} />
    </SwiperSlide>
  ));

  const Categories = () => {
    return (
      <>
        <Medium
          index={1}
          category="mens"
          url={'/Category/Men'}
          image={menImage}
        />
        <Medium
          index={2}
          category="womens"
          url={'/Category/Women'}
          image={womenImage}
        />
        <Medium
          index={3}
          category="kids"
          url={'/Category/kids'}
          // image={tommy}
        />
        <Medium
          image={electronics}
          index={4}
          category="electronics"
          url={'/Category/electronics'}
        />
      </>
    );
  };

  const Deals = () => (
    <CarouselComp>
      {products.map((product, index) => (
        <SwiperSlide key={index}>
          <Small id={index} product={product}/>
        </SwiperSlide>
      ))}
    </CarouselComp>
  );

  return (
    <div className="products-container">
      {/* Categories */}
      {/* <div className="medium-products-wrapper" ref={categoriesRef}>
        <motion.h1
          animate={inView ? { translateX: '0px' } : { translateX: '-150%' }}
          transition={{
            type: 'spring',
            damping: 18,
          }}
          className="new-arrivals uppercase text-[38px] text-[var(--nightBlue)] text-end cursor-default"
        >
          Discover our categories
        </motion.h1>
        <div className="medium-products-container">
          <Categories />
        </div>
      </div> */}

      {/* Arrivals */}
      <div className="small-products-container">
        <h1 className="new-arrivals w-full text-[25px] uppercase text-center text-[var(--army)]">
          New Arrivals
        </h1>
        {productsIsLoading ? (
          <SkeletonContainer w={260} h={400} repeat={5} mr={5}/>
        ) : (
          <CarouselComp>{newArrivals}</CarouselComp>
        )}
      </div>

      {/* DEALS       */}
      {/* <div className="">
        <h1 className="deals uppercase w-full text-[25px] text-center text-[var(--army)]">
          Deals
        </h1>
        <div className="small-products-container">
          <Deals />
        </div>
      </div> */}
    </div>
  );
};

export default Products;
