'use client';
import React from 'react';
import { calculateDiscountedPrice } from '@/shared/helpers/utils';
import { useGetCustomerCart } from '@/shared/hooks/cart';
import { selectAuthState } from '@/shared/redux/authSlice';
import { ProductsResponse } from '@/shared/types/responseTypes';
import { Button } from '@mantine/core';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const Basket = () => {
  const user = useSelector(selectAuthState);
  const { cart, isLoading, error } = useGetCustomerCart({
    id: user?.data.user?.id,
  });

  const items = () =>
    cart?.products?.map((item, index) => (
      <div key={item + index} className="flex">
        <div>
          <Button></Button>
        </div>
        <figure className="relative">
          {/* <Image src={} alt="" fill /> */}
        </figure>
        <div className="flex">
          <h1>{item.productName}</h1>
          <div>
            <p className="price">
              ${calculateDiscountedPrice(item.price, item.discount)}
            </p>
            {item.discount && item.discount > 0 && (
              <div className="relative flex flex-col justify-center items-center h-[15px]">
                <span className="w-[2px] h-[35px] absolute bg-[#d1d1d1] rotate-[110deg]" />
                <p className={`discount m-0`}>${item.price}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    ));

  return (
    <div className="p-[10px]">
      {!isLoading && (
        <>
          <div className="flex items-end h-[25px]">
            <h2 className="m-0 h-[25px] uppercase">
              Your Cart has {cart?.products?.length ?? 'no'} items
            </h2>
          </div>
          <div className="basket-wrapper">
            <div className="basket-container">
              {cart ? items : <p>Add items to your cart</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
