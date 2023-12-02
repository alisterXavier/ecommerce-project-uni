'use client';
import products from '@/public/productList.json';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Small from '@/app/Components/Product-type/small-product';
import { SwiperSlide } from 'swiper/react';
import { useProduct } from '@/shared/hooks/products';
import { SkeletonContainer } from '@/app/Components/SkeletonComp';
import { IconChevronRight } from '@tabler/icons-react';

const SingleProduct = ({ params }: { params: { productId: string } }) => {
  const router = useRouter();
  const { data, productIsLoading, productError } = useProduct(params.productId);

  // const { data: products, productIsLoading, productError} = useProducts()

  const similarProducts = products.map((product, index) => (
    <SwiperSlide key={index}>
      <Small id={index} product={product}>
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

  const SimilarSkeletonContainer = () => (
    <SkeletonContainer w={260} h={400} mr={5} repeat={5} />
  );

  return (
    <main className="relative w-screen bg-white p-5">
      <div className="flex items-end h-[25px]">
        <h2 className="m-0 h-[25px]">HOME</h2>
        <div className="h-[23px]">
          <IconChevronRight />
        </div>
        {/* <h2 className="m-0 uppercase h-[25px]">{params.category}</h2> */}
      </div>
      <div className="main-header flex flex-wrap justify-center items-center">
        <div className="w-[500px] h-[80%] border-solid border-gray-300 border-r mr-10 flex justify-center items-center">
          <div className="relative w-[60%] h-[100%]">
            {productIsLoading || productError || !data ? (
              <>
                <SkeletonContainer w={270} h={220} repeat={1} mb={5} />
                <SkeletonContainer w={70} h={70} repeat={4} mr={5} />
              </>
            ) : (
              <figure className='w-auto h-auto'>
                <Image
                  alt=""
                  src={data && data.productImages ? data.productImages[0] : ''}
                  fill
                  quality={100}
                  objectFit="contain"
                />
              </figure>
            )}
          </div>
        </div>
        <div className="flex flex-col w-[40%]">
          {productIsLoading || productError || !data ? (
            <>
              <SkeletonContainer w={500} h={50} repeat={1} mb={5} />
              <SkeletonContainer w={400} h={200} repeat={1} />
            </>
          ) : (
            <>
              <h1 className="text-[30px] my-5 underline">{data.productName}</h1>
              <p className="">{data.description}</p>
            </>
          )}
          <div className="my-10 flex justify-between items-center">
            {productIsLoading || productError || !data? (
              <>
                <SkeletonContainer w={50} h={40} repeat={1} />
                <SkeletonContainer w={120} h={50} repeat={1} />
              </>
            ) : (
              <>
                <p className="price">${data.price}</p>
                <button className="shop-now-btn">
                  <p>Add to cart</p>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="products-container">
        <div className="small-products-container">
          <h1 className="new-arrivals uppercase">Similar Items</h1>
          {/* {productsisLoading ? (
            <div className="flex">
              <SimilarSkeletonContainer />
            </div>
          ) : (
            <CarouselComp>{similarProducts}</CarouselComp>
          )} */}
        </div>
      </div>
    </main>
  );
};

export default SingleProduct;
