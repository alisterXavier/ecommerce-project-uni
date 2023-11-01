import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface mediumProps {
  category: string;
  url: string;
  index: number;
}
const Medium: React.FC<mediumProps> = ({ category, url, index }) => {
  const router = useRouter();

  const categoryClick = () => {
    router.push(url);
  };

  return (
    <div className="medium-product-container relative">
      <div className="medium-product-image">
        <Image
          alt=""
          src="https://m.media-amazon.com/images/I/81BYv-m8ltL._AC_UY327_FMwebp_QL65_.jpg"
          layout="fill"
        />
      </div>
      <div className="medium-product-details">
        <h1 className="uppercase">{category}</h1>
        <button className="shop-now-btn" onClick={categoryClick}>
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

      <span className={`category categories-${index}`}></span>
    </div>
  );
};

export default Medium;
