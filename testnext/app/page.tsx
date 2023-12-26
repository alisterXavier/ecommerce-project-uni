import Image from 'next/image';
import product from '@/public/productList.json';

export default function Home() {
  return (
    <div className="">
      <div
        className="border-transparent border  hover:border-black cursor-pointer"
        style={{
          width: '270px',
          height: '450px',
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
          borderRadius: '3px',
        }}
      >
        <figure
          style={{
            width: '250px',
            height: 360,
            position: 'relative',
          }}
        >
          {product.image.map((image, index) => {
            return (
              <Image
                key={index}
                className={` transition-all duration-200 ${index === 1 && 'hover:opacity-0'}`}
                alt="asdsad"
                src={image}
                fill
              />
            );
          })}
        </figure>
        <p
          className="RelaxedFitSweatshirt"
          style={{
            color: 'black',
            fontSize: 20,
          }}
        >
          {product.title}
        </p>
        <p
          className="Gel"
          style={{
            color: 'black',
            fontSize: 24,
          }}
        >
          ${product.price}
        </p>
      </div>
    </div>
  );
}
