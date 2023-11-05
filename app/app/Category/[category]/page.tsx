'use client';

import Image from 'next/image';
import products from '@/public/productList.json';
import Small from '@/app/Components/Product-type/small-product';
import { useState, useEffect } from 'react';
import axios from 'axios'

const Category = ({ params }: { params: { category: string } }) => {
  const [data, setData] = useState(null)
  const getData = () => {
    axios.get(`http://localhost:5001/products/${params.category.toLocaleLowerCase()}`)
  }

  useEffect(() => {
    getData()
  })
  return (
    <div className="p-[10px]">
      <h2 className='uppercase'>{params.category}</h2>
      <div className="small-products-container">
        {products.map((product, index) => (
          <Small layoutId={index} key={index}>
            <div className="small-product-image">
              <figure>
                <Image
                  alt=""
                  src={product.image}
                  fill
                  quality={100}
                  sizes="100%"
                />
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
        ))}
      </div>
    </div>
  );
};

export default Category;
