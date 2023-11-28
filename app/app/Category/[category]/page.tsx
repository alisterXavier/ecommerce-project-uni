'use client';
import Image from 'next/image';
import Small from '@/app/Components/Product-type/small-product';
import { useProducts } from '@/shared/hooks/products';
import { calculateDiscountedPrice } from '@/shared/helpers/utils';
import { SkeletonContainer } from '@/app/Components/SkeletonComp';
import { IconChevronRight } from '@tabler/icons-react';
import { Filter } from '@/app/Components/Filter';
import { useState } from 'react';

const Category = ({ params }: { params: { category: string } }) => {
  const [filterByType, setFilterByType] = useState<string>('');
  const [filterByPrice, setFilterByPrice] = useState<string>('');
  const parameters = {
    category: params.category,
    filterOptions: [filterByPrice, filterByType],
  };
  const { data, productsIsLoading, productsError } = useProducts({
    parameters,
  });

  return (
    <div className="p-[10px]">
      <div className="flex items-end h-[25px]">
        <h2 className="m-0 h-[25px]">HOME</h2>
        <div className="h-[23px]">
          <IconChevronRight />
        </div>
        <h2 className="m-0 uppercase h-[25px]">{params.category}</h2>
      </div>
      <div className="flex flex-wrap justify-between relative pt-5">
        <Filter
          type={params.category}
          filterByTypeFn={{ filterByType, setFilterByType }}
          filterByPriceFn={{ filterByPrice, setFilterByPrice }}
        />
        <div className="small-products-container">
          {productsIsLoading || productsError ? (
            <SkeletonContainer
              w={262}
              h={400}
              repeat={8}
              mr={5}
              mb={5}
              wrap={true}
            />
          ) : data.data.length === 0 ? (
            <p>No products to display.</p>
          ) : (
            data.data.map((product, index) => (
              <Small id={product.id} key={index}>
                <div className="small-product-image">
                  <figure>
                    <Image
                      alt=""
                      src={
                        product.productImages ? product.productImages[0] : ''
                      }
                      fill
                      quality={100}
                      objectFit="contain"
                    />
                  </figure>
                </div>
                <div className="small-product-details">
                  <p className="small-product-description">
                    {product.productName}
                  </p>
                  <div className="small-product-price-cart">
                    <div>
                      <p className="price">
                        $
                        {calculateDiscountedPrice(
                          product.price,
                          product.discount
                        )}
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
              </Small>
            ))
          )}
          Fi
        </div>
      </div>
    </div>
  );
};

export default Category;
