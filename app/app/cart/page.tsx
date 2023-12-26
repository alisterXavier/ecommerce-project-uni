'use client';
import React from 'react';
import { calculateDiscountedPrice } from '@/shared/helpers/utils';
import { useCustomerCart } from '@/shared/hooks/cart';
import { selectAuthState } from '@/shared/redux/authSlice';
import { Button, Table, Text } from '@mantine/core';
import Image from 'next/image';
import { useSelector } from 'react-redux';
// import cart from './test.json';
import { IconTrash } from '@tabler/icons-react';
import { components } from '@/shared/types/api';
import { useCounter } from '@mantine/hooks';
import { TableBody } from '@mui/material';

// const BasketItem = (data: { data: components['schemas']['Products'] }) => {
//   const product = data.data;
//   const [count, handler] = useCounter(0, { min: 0, max: 10 });
//   return (
//     <div
//       key={`${product.id}`}
//       className={`flex items-center my-2 w-[80%] border border-[var(--testColor)] rounded-sm p-5 image-transition`}
//     >
//       <figure className="relative">
//         {product.productImages.map((image, index) => {
//           return (
//             <figure key={index} className={`relative w-[100px] h-[100px]`}>
//               <Image
//                 key={index}
//                 className={``}
//                 alt="asdsad"
//                 src={image}
//                 fill
//                 quality={100}
//                 objectFit="contain"
//               />
//             </figure>
//           );
//         })}
//       </figure>
//       <div className="flex flex-col mx-5">
//         <h1 className="small-product-title w-[400px] text-[20px]">
//           {product.productName}
//         </h1>
//         <div>
//           <p className="price">
//             ${calculateDiscountedPrice(product.price, product.discount)}
//           </p>
//           {product.discount && product.discount > 0 ? (
//             <div className="relative flex flex-col justify-center items-center h-[15px]">
//               <span className="w-[2px] h-[35px] absolute bg-[#d1d1d1] rotate-[110deg]" />
//               <p className={`discount m-0`}>${product.discount}</p>
//             </div>
//           ) : (
//             <></>
//           )}
//         </div>
//       </div>
//       <div className='h-full'>
//         <div className="flex items-center border my-1">
//           <Button
//             p={0}
//             radius={3}
//             w={30}
//             h={30}
//             variant="light"
//             bg={'transparent'}
//             color="var(--testColor)"
//             onClick={handler.decrement}
//           >
//             -
//           </Button>
//           <Text
//             m={0}
//             w={30}
//             h={30}
//             className="flex items-center justify-center"
//           >
//             {count}
//           </Text>
//           <Button
//             p={0}
//             radius={3}
//             w={30}
//             h={30}
//             variant="light"
//             bg={'transparent'}
//             color="var(--testColor)"
//             onClick={handler.increment}
//           >
//             +
//           </Button>
//         </div>
//         <Button variant="light" color="red">
//           <IconTrash />
//         </Button>
//       </div>
//     </div>
//   );
// };

const BasketItem = ({
  data,
  index,
}: {
  data: components['schemas']['Products'];
  index: number;
}) => {
  const product = data;
  const [count, handler] = useCounter(0, { min: 0, max: 10 });

  return (
    <Table.Tr
      key={`wrapper ${product.id + index}`}
      className="image-transition cursor-pointer"
    >
      <Table.Td>
        <div className="relative flex items-center">
          {product.productImages.map((image, index) => {
            return (
              <figure
                key={image + index}
                className={`relative w-[100px] h-[100px]`}
              >
                <Image
                  key={index}
                  className={``}
                  alt="asdsad"
                  src={image}
                  fill
                  quality={100}
                  objectFit="contain"
                />
              </figure>
            );
          })}
          <h1 className="small-product-title w-[500px] !h-[20px] ml-3 text-[15px]">
            {product.productName}
          </h1>
        </div>
      </Table.Td>
      <Table.Td>
        <div className="flex justify-center items-center">
          <p className="text-[var(--testColor)] p-1">
            {product.discount > 0 ? `-${product.discount}%` : ''}
          </p>
        </div>
      </Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>
        ${calculateDiscountedPrice(product.price, product.discount)}
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
            >
              -
            </Button>
            <Text
              m={0}
              w={30}
              h={30}
              className="flex items-center justify-center"
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
            >
              +
            </Button>
          </div>
        </div>
      </Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>
        <Button variant="transparent" color="red">
          <IconTrash />
        </Button>
      </Table.Td>
    </Table.Tr>
  );
};

const Basket = () => {
  const user = useSelector(selectAuthState);
  const { cart, isLoading, error, updateCart } = useCustomerCart(
    user?.data.user?.id ?? undefined
  );
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
            <BasketItem index={index} data={item} />
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
      <div className="flex">
        {user && user.data.user ? (
          <>
            <div className="basket-wrapper w-[70%] pr-4">
              <div className="basket-container relative">
                {!isLoading ? (
                  items()
                ) : !cart ? (
                  <></>
                ) : (
                  <p>Add items to your cart</p>
                )}
              </div>
            </div>
            <div className="checkout w-[30%] sticky top-[var(--nav-height)] h-fit p-5">
              <div className="w-full">
                {/* <h1 className="uppercase">Checkout</h1> */}
                {cart ? (
                  <>
                    <p className=" text-[18px] my-0 flex items-center uppercase">
                      Selected items
                      <span className={'ml-1 text-[var(--testColor)]'}>
                        ({cart?.products?.length})
                      </span>
                    </p>
                    <div className="flex">
                      <p>Total:</p>
                      <p className="ml-1">${cart.total}</p>
                    </div>
                    <Button w={'100%'} variant="light" color={'black'}>
                      <a href={user ? '#' : '/Login'}>Pay</a>
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Basket;
