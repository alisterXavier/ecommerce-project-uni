'use client';
import { selectedProduct } from '@/app/page';
import products from '@/public/productList.json';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Small from '@/app/Components/Product-type/small-product';
import { CarouselComp } from '@/app/Components/Carousel';
import { SwiperSlide } from 'swiper/react';
import axios from 'axios'

type ISingleProduct = {
  layoutId: number | null;
};

const SingleProduct = ({ params }: { params: { productId: string } }) => {
  const router = useRouter();
  const [data, setData] = useState(null)
  const getData = () => {
    axios.get(`http://localhost:5001/products/${params.productId}`)
  }

  useEffect(() => {
    getData()
  })
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

  return (
    <main className="relative w-screen bg-white p-5">
      <div className="main-header flex flex-wrap justify-center items-center">
        <div className="w-[500px] h-[100%] border-solid border-gray-300 border-r mr-10 flex justify-center items-center">
          <div className="relative w-[60%] h-[250px]">
            <Image
              alt=""
              src={products[params.productId as unknown as number].image}
              layout="fill"
            />
          </div>
        </div>
        <div className="flex flex-col w-[40%]">
          <h1 className="text-[30px] my-5 underline">
            {products[params.productId as unknown as number].title}
          </h1>
          <p className="">
            {products[params.productId as unknown as number].description}
          </p>
          <div className="my-10 flex justify-between items-center">
            <p className="price">
              {products[params.productId as unknown as number].price}
            </p>
            <button className="shop-now-btn">
              <p>Add to cart</p>
            </button>
          </div>
        </div>
      </div>
      <div className='products-container'>
        <div className="small-products-container">
          <h1 className="new-arrivals uppercase">Similar Items</h1>
          <CarouselComp>{newArrivals}</CarouselComp>
        </div>
      </div>
    </main>
  );
};

export default SingleProduct;
