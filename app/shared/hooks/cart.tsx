'use client';
import { useSwrInstance } from '../swr/swrInit';
import { useEffect, useState } from 'react';
import { CartResponse } from '../types/responseTypes';
import { components } from '../types/api';
import { calculateDiscountedPrice } from '../helpers/utils';
import { arraysEqual } from '../helpers/debounce';
import { CartUpdate } from '../types/requestTypes';

export const useCustomerCart = (id?: string) => {
  const { requests, queries } = useSwrInstance();
  const [cart, setCart] = useState<CartResponse>();
  const { data, isLoading, error, mutate } = queries.useGetCartByUserId(id);

  const addCartItem = async (product: components['schemas']['Products']) => {
    const updatedList = data?.data.products
      ? [...data?.data.products.map((i) => i.id), product.id]
      : [product.id];

    const total =
      (data?.data.total ?? 0) +
      parseFloat(calculateDiscountedPrice(product.price, product.discount));

    const cartData: CartUpdate = {
      id: data?.data.id,
      customerId: id,
      products: updatedList,
      total: total,
    };
    const res = await requests.useUpdateCartByCartId(cartData);
    mutate(await res);
  };

  const removeCartItem = async (product: components['schemas']['Products']) => {
    const total =
      cart && cart.data.products.length > 0
        ? (cart?.data.total ?? 0) -
          parseFloat(calculateDiscountedPrice(product.price, product.discount))
        : 0;

    const productList: string[] =
      cart?.data.products
        .filter((prod) => prod.id !== product.id)
        .map((i) => i.id) ?? [];

    const cartData: CartUpdate = {
      id: cart?.data.id,
      customerId: cart?.data.customerId,
      products: productList,
      total: total,
    };
    const res = await requests.useUpdateCartByCartId(cartData);
    mutate(await res);
  };

  const cartHasData = cart && cart.data;

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        if (cartHasData) {
          if (!arraysEqual(data.data.products, cart.data.products))
            setCart(data);
        } else setCart(data);
      }
    }
  }, [isLoading, data, cart, cartHasData]);

  return {
    cart: cart?.data,
    isLoading,
    error,
    updateCart: {
      addCartItem,
      removeCartItem,
    },
  };
};
