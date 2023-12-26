'use client';
import products from '@/public/productList.json';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SwiperSlide } from 'swiper/react';
import { useProduct } from '@/shared/hooks/products';
import { SkeletonContainer } from '@/app/Components/SkeletonComp';
import { IconChevronRight } from '@tabler/icons-react';
import { useCustomerCart } from '@/shared/hooks/cart';
import { selectAuthState } from '@/shared/redux/authSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const SingleProduct = ({ params }: { params: { productId: string } }) => {
  const router = useRouter();
  const user = useSelector(selectAuthState);
  const { data, productIsLoading, productError } = useProduct(params.productId);
  const { cart, isLoading, error, updateCart } = useCustomerCart(
    user?.data.user?.id
  );
  const [selectedImage, setSelectedImage] = useState<
    string | null | StaticImport
  >(null);
  // const { data: products, productIsLoading, productError} = useProducts()

  const similarProducts = products.map((product, index) => (
    <SwiperSlide key={index}></SwiperSlide>
  ));

  const SimilarSkeletonContainer = () => (
    <SkeletonContainer w={260} h={400} mr={5} repeat={5} />
  );

  const addToCart = () => {
    data.id && updateCart.addCartItem(data);
  };

  useEffect(() => {
    if (data && data.productImages) setSelectedImage(data?.productImages?.[0]);
    return;
  }, [data]);

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
          <div className="relative flex flex-col items-center w-[100%] h-[100%]">
            {productIsLoading || productError || !data ? (
              <>
                <SkeletonContainer w={270} h={220} repeat={1} mb={5} />
                <SkeletonContainer w={70} h={70} repeat={4} mr={5} />
              </>
            ) : (
              <>
                {selectedImage && (
                  <figure className="relative w-[100%] h-[300px] my-5">
                    <Image
                      alt=""
                      src={selectedImage}
                      fill
                      quality={100}
                      objectFit="contain"
                    />
                  </figure>
                )}
                <div className="flex w-fit h-fit">
                  {data.productImages?.map((item, index) => {
                    return (
                      <figure
                        key={index}
                        className="relative mx-1 w-[90px] h-fit p-1 border-4 rounded  border-[var(--testColor)]"
                      >
                        <Image
                          alt=""
                          src={
                            data && data.productImages
                              ? data.productImages[0]
                              : ''
                          }
                          width={100}
                          height={100}
                          quality={100}
                          objectFit="contain"
                        />
                      </figure>
                    );
                  })}
                  <figure className="relative w-[90px] mx-1 h-fit p-1 border-4 rounded  border-[var(--testColor)]">
                    <Image
                      alt=""
                      src={
                        data && data.productImages ? data.productImages[0] : ''
                      }
                      width={100}
                      height={100}
                      quality={100}
                      objectFit="contain"
                    />
                  </figure>
                  <figure className="relative w-[90px] mx-1 h-fit p-1 border-4 rounded  border-[var(--testColor)]">
                    <Image
                      alt=""
                      src={
                        data && data.productImages ? data.productImages[0] : ''
                      }
                      width={100}
                      height={100}
                      quality={100}
                      objectFit="contain"
                    />
                  </figure>
                  <figure className="relative w-[90px] mx-1 h-fit p-1 border-4 rounded  border-[var(--testColor)]">
                    <Image
                      alt=""
                      src={
                        data && data.productImages ? data.productImages[0] : ''
                      }
                      width={100}
                      height={100}
                      quality={100}
                      objectFit="contain"
                    />
                  </figure>
                </div>
              </>
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
            {productIsLoading || productError || !data ? (
              <>
                <SkeletonContainer w={50} h={40} repeat={1} />
                <SkeletonContainer w={120} h={50} repeat={1} />
              </>
            ) : (
              <>
                <p className="price">${data.price}</p>
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart()}
                >
                  <p>Add to cart</p>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <div className="products-container">
        <div className="small-products-container">
          <h1 className="new-arrivals uppercase">Similar Items</h1>
          {productsisLoading ? (
            <div className="flex">
              <SimilarSkeletonContainer />
            </div>
          ) : (
            <CarouselComp>{similarProducts}</CarouselComp>
          )}
        </div>
      </div> */}
    </main>
  );
};

export default SingleProduct;
