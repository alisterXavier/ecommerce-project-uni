'use client';
import { useSelector } from 'react-redux';
import { fetchUser, selectAuthState } from '../redux/authSlice';
import { useSwrInstance } from '../swr/swrInit';
import { useGetUser } from './products';
import { useEffect, useState } from 'react';
import { CartResponse } from '../types/responseTypes';

export const useGetCustomerCart = ({ id }: { id?: string }) => {
  const { requests } = useSwrInstance();
  const [cart, setCart] = useState<CartResponse>();
  const { data, isLoading, error } = requests.useGetCartByUserId(
    id
  );
  
  useEffect(() => {
    if (!isLoading) {
      if (
        data &&
        data.data?.products?.length &&
        data.data?.products?.length > 0
      ) {
        if (
          !cart?.data.products?.every((i) =>
            data.data.products?.includes(i)
          )
        ) {
          setCart(data);
        }
      }
    }
  }, [isLoading, data, cart?.data.products]);

  return {
    cart: cart?.data,
    isLoading,
    error,
  };
};
