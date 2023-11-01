'use client';
import Image from 'next/image';
import products from '@/public/productList.json';
import Medium from './mid-product';
import Small from './small-product';
import { CarouselComp } from '../Carousel';
import { SwiperSlide } from 'swiper/react';

const Products = () => {
  const newArrivals = products.map((product, index) => (
    <SwiperSlide key={index}>
      <Small layoutId={index}>
        <div className="small-product-image">
          <figure>
            <Image alt="" src={product.image} fill quality={100} sizes="100%" />
          </figure>
        </div>
        <div className="small-product-details">
          {/* <h1>Razer Blade 14 </h1> */}
          <p className="small-product-description">{product.description}</p>
          <div className="small-product-price-cart">
            <p className="price">{product.price}</p>
            {/* <button>Add to cart</button> */}
          </div>
        </div>
      </Small>
    </SwiperSlide>
  ));

  const MediumItems = () => {
    return (
      <>
        <Medium index={1} category="mens" url={'/Category/mens'} />
        <Medium index={2} category="womens" url={'/Category/womens'} />
        <Medium index={3} category="kids" url={'/Category/kids'} />
        <Medium
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
          <Small layoutId={index}>
            <div className="small-product-image">
              <figure>
                <Image
                  alt=""
                  src={product.image}
                  fill
                  quality={100}
                  sizes="100%"
                />
              </figure>
            </div>
            <div className="small-product-details">
              {/* <h1>Razer Blade 14 </h1> */}
              <p className="small-product-description">{product.description}</p>
              <div className="small-product-price-cart">
                <p className="price">{product.price}</p>
                {/* <button>Add to cart</button> */}
              </div>
            </div>
          </Small>
        </SwiperSlide>
      ))}
    </CarouselComp>
  );

  return (
    <div className="products-container">
      <div className="small-products-container">
        <h1 className="new-arrivals w-full text-[25px] uppercase text-center">New Arrivals</h1>
        <CarouselComp>{newArrivals}</CarouselComp>
      </div>
      <div className="medium-products-wrapper">
        <h1 className="new-arrivals uppercase text-[25px] text-center cursor-default">
          Discover our categories
        </h1>
        <div className="medium-products-container">
          <MediumItems />
        </div>
      </div>
      <div className="">
        <h1 className="deals uppercase w-full text-[25px] text-center">Deals</h1>
        <div className="small-products-container">
          <Deals />
        </div>
      </div>
    </div>
  );
};

export default Products;
