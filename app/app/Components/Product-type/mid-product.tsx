import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

interface mediumProps {
  category: string;
  url: string;
  index: number;
  image?: StaticImageData;
  position? : string
}
const Medium: React.FC<mediumProps> = ({ category, url, index, image, position }) => {
  const router = useRouter();

  const categoryClick = () => {
    router.push(url);
  };

  return (
    <div className={'medium-product-container relative'}>
      {/* <div className="medium-back">
        <div className="medium-product-image relative">
          <figure className="relative w-full h-full">
            <Image alt="" src={image} layout="fill" />
          </figure>
        </div>
      </div> */}

      <div className="medium-front">
        <div className="medium-product-details">
          <h1 className="uppercase">{category}</h1>
          <button className="shop-now-btn " onClick={categoryClick}>
            <p>Shop now</p>
          </button>
          {/* <p className="medium-product-description">
            Razer Blade 14 Gaming Laptop (2023 Model): AMD Ryzen 9 7940HS CPU
            - NVIDIA GeForce RTX 4060 GPU - 14&quot; 16:10 QHD+ 240Hz -16GB
            DDR5 RAM - 1TB SSD - Windows 11 - Vapor Chamber Cooling - Chroma
            RGB
          </p>
          <div className="medium-product-price-cart">
            <p className="price">$50</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Medium;
