import React, { useContext } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { components } from '@/shared/types/api';
import { calculateDiscountedPrice } from '@/shared/helpers/utils';

interface SmallProps {
  product: components['schemas']['Products'];
  id: number;
}
const Small = ({ product, id }: SmallProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/Product/${id}`);
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className="small-product-container"
    >
      <div className="small-transition-container w-full h-full">
        <div className="small-product-image">
          <figure>
            <Image
              alt=""
              src={product.productImages ? product.productImages[0] : ''}
              fill
              quality={100}
              objectFit="contain"
            />
          </figure>
        </div>
        <div className="small-product-details">
          <p className="small-product-description">{product.productName}</p>
          <div className="small-product-price-cart">
            <div>
              <p className="price">
                ${calculateDiscountedPrice(product.price, product.discount)}
              </p>
              {product.discount && product.discount > 0 && (
                <div className="relative flex flex-col justify-center items-center h-[15px]">
                  <span className="w-[2px] h-[35px] absolute bg-[#d1d1d1] rotate-[110deg]" />
                  <p className={`discount m-0`}>${product.price}</p>
                </div>
              )}
            </div>
            <a href={`/Product/${product.id}`} className="text-[15px]">
              View product
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Small;
