// import cart from './test.json';
import { IconTrash } from '@tabler/icons-react';
import { components } from '@/shared/types/api';
import { useCounter } from '@mantine/hooks';
import { TableBody } from '@mui/material';
import { UserMetadata } from '@supabase/supabase-js';
import { CartResponse, ProductsResponse } from '@/shared/types/responseTypes';
import { Button, Table, Text } from '@mantine/core';
import Image from 'next/image';
import { calculateDiscountedPrice } from '@/shared/helpers/utils';

const CartItem = ({
  data,
  index,
  removeItem,
}: {
  data: components['schemas']['Products'];
  index: number;
  removeItem: (product: components['schemas']['Products']) => void;
}) => {
  const product = data;
  const [count, handler] = useCounter(0, { min: 0, max: 10 });
  return (
    <Table.Tr
      key={`wrapper ${product.id + index}`}
      className="cursor-pointer image-transition"
    >
      <Table.Td>
        <div className="relative flex items-center">
          <figure className={`relative w-[100px] h-[100px]`}>
            {product?.productImages.map((image, index) => {
              return (
                <Image
                  data-cy={`test-cart-item-image-${product.id}`}
                  key={index}
                  alt={product.productName}
                  className={`transition-all duration-200 ${
                    index === 1 && 'hover:opacity-0'
                  }`}
                  src={image}
                  fill
                  quality={100}
                  objectFit="contain"
                />
              );
            })}
          </figure>
          <h1
            className="small-product-title w-fit !h-[20px] ml-3 text-[15px]"
            data-cy={`test-cart-item-title-${product.id}`}
          >
            {product.productName}
          </h1>
        </div>
      </Table.Td>
      <Table.Td>
        <div className="flex justify-center items-center">
          <p
            className="text-[var(--testColor)] p-1"
            data-cy={`test-cart-item-discount-${product.id}`}
          >
            {product.discount > 0 ? `-${product.discount}%` : ''}
          </p>
        </div>
      </Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>
        <p data-cy={`test-cart-item-price-${product.id}`}>
          ${calculateDiscountedPrice(product.price, product.discount)}
        </p>
      </Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>
        <div className="flex items-center justify-center my-1">
          <div className="flex items-center justify-center w-fit border">
            <Button
              p={0}
              radius={3}
              w={30}
              h={30}
              variant="light"
              bg={'transparent'}
              color="var(--testColor)"
              onClick={handler.decrement}
              data-cy={`test-cart-item-decrement-${product.id}`}
            >
              -
            </Button>
            <Text
              m={0}
              w={30}
              h={30}
              className="flex items-center justify-center"
              data-cy={`test-cart-item-qty-${product.id}`}
            >
              {count}
            </Text>
            <Button
              p={0}
              radius={3}
              w={30}
              h={30}
              variant="light"
              bg={'transparent'}
              color="var(--testColor)"
              onClick={handler.increment}
              data-cy={`test-cart-item-increment-${product.id}`}
            >
              +
            </Button>
          </div>
        </div>
      </Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>
        <Button
          variant="transparent"
          color="red"
          onClick={() => removeItem(data)}
          data-cy={`test-cart-item-remove-${product.id}`}
        >
          <IconTrash />
        </Button>
      </Table.Td>
    </Table.Tr>
  );
};

type CartType = {
  user: UserMetadata | null;
  cart: components['schemas']['Carts'] | undefined;
  updateCart: {
    removeCartItem: (product: components['schemas']['Products']) => void;
    addCartItem: (product: components['schemas']['Products']) => void;
  };
  isLoading: boolean;
};

export const Cart = ({ user, cart, isLoading, updateCart }: CartType) => {
  const items = () => (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            <p>Product</p>
          </Table.Th>
          <Table.Th>
            <p className="uppercase text-center">Discount</p>
          </Table.Th>
          <Table.Th>
            <p className="uppercase text-center">Price</p>
          </Table.Th>
          <Table.Th>
            <p className="uppercase text-center">Quantity</p>
          </Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <TableBody>
        {cart?.products?.map((item, index) => (
          <>
            <CartItem
              index={index}
              data={item}
              removeItem={updateCart.removeCartItem}
            />
          </>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-[10px]">
      <div className="flex items-end h-[25px]">
        <h2 className="m-0 h-[25px] uppercase">Cart</h2>
      </div>
      <div className="flex flex-wrap">
        {user && user.data.user ? (
          <>
            {!isLoading && cart && cart.products.length > 0 ? (
              <>
                <div className="basket-wrapper lg:w-fit w-[100%] pr-4">
                  <div className="basket-container relative">{items()}</div>
                </div>
                <div
                  className="checkout md:w-[30%] w-full sticky top-[var(--nav-height)] h-fit p-5"
                  data-cy="test-checkout"
                >
                  <div className="w-full">
                    <p className=" text-[18px] my-0 flex items-center uppercase">
                      Selected items
                      <span
                        className={'ml-1 text-[var(--testColor)]'}
                        data-cy="test-selected-items"
                      >
                        ({cart?.products?.length})
                      </span>
                    </p>
                    <div className="flex">
                      <p>Total:</p>
                      <p className="ml-1" data-cy="test-total">
                        ${cart.total}
                      </p>
                    </div>
                    <Button
                      w={'100%'}
                      variant="light"
                      color={'var(--testColor)'}
                    >
                      <a href={user ? '#' : '/Login'}>Pay</a>
                    </Button>
                  </div>
                </div>
              </>
            ) : isLoading ? (
              <></>
            ) : (
              <p data-cy="test-add-cart-items">Add items to your cart.</p>
            )}
          </>
        ) : (
          <div className="mt-5">
            <Button
              variant="light"
              color="var(--testColor)"
              data-cy={'test-login-btn'}
            >
              <a href="/Login">Log in</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
