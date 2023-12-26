'use client';
import Small from '@/app/Components/Product-type/small-product';
import { useProducts } from '@/shared/hooks/products';
import { calculateDiscountedPrice } from '@/shared/helpers/utils';
import { SkeletonContainer } from '@/app/Components/SkeletonComp';
import { IconChevronRight } from '@tabler/icons-react';
import { Filter } from '@/app/Components/Filter';
import { useEffect, useState } from 'react';
import { cache } from 'swr/_internal';
import { ProductsResponse } from '@/shared/types/responseTypes';

const Category = ({ params }: { params: { category: string } }) => {
  const [filterByType, setFilterByType] = useState<string[]>([]);
  const [filterByPrice, setFilterByPrice] = useState<string>('');
  // const [filterByPriceRange, setFilterByPriceRange] = useState<number[]>([10, 2000]);

  const parameters = {
    category: params.category,
    filterOptions: {
      type: filterByType,
      price: filterByPrice,
      // priceMin: filterByPriceRange[0],
      // priceMax: filterByPriceRange[1],
    },
  };
  const { data, productsIsLoading, productsError } = useProducts({
    category: params.category,
    filterOptions: {
      type: filterByType,
      price: filterByPrice,
    },
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
        {/* <Filter
          type={params.category}
          filterByTypeFn={{ filterByType, setFilterByType }}
          filterByPriceFn={{ filterByPrice, setFilterByPrice }}
          // filterByPriceRangeFn={{ filterByPriceRange, setFilterByPriceRange }}
        /> */}
        <div className="small-products-container">
          {(!data && productsIsLoading) || productsError ? (
            <SkeletonContainer
              w={262}
              h={400}
              repeat={8}
              mr={5}
              mb={5}
              wrap={true}
            />
          ) : !data ? (
            <p>No products to display.</p>
          ) : (
            data.data.map((product, index) => (
              <Small id={product.id} key={index} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
