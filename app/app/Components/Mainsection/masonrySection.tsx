import Image from 'next/image';
import image1 from '@/public/images/home/home3.jpeg';
import image4 from '@/public/images/home/home4.jpeg';
import image5 from '@/public/images/home/home5.jpg';
import image8 from '@/public/images/home/home8.jpg';
import image9 from '@/public/images/home/home9.jpg';
import womenSliderImage from '@/public/images/carousel/women-slider-image.jpg';
import Masonry from '@mui/lab/Masonry';

export const MasonryComp = () => (
  <div className="flex justify-center items-center h-full w-full bg-[var(--testColor)]">
    <div className="w-[40%] p-10 flex flex-col justify-between items-center">
      <div className="w-[50%] flex justify-center items-center">
        <h1 className="text-white text-[100px] w-full leading-[100px] uppercase table-caption">
          {['keep', 'it', 'classy'].map((i, index) => (
            <span key={index} className="block">
              {i}
            </span>
          ))}
        </h1>
      </div>
      <div className="w-[50%]">
        <h1 className="text-white text-[70px] w-[10%] leading-[90px] uppercase table-caption">
          25% off
        </h1>
      </div>
      <div className="w-full text-right">
        <a className="text-white uppercase hover:underline" href="/discount">
          Check Out now
        </a>
      </div>
    </div>
    <div className="w-[60%] relative h-full overflow-hidden">
      <span className="upper-gradient"></span>
      <span className="lower-gradient"></span>
      <div className="w-full masonry justify-center items-center">
        <Masonry columns={2} spacing={1}>
          <figure className="relative w-[300px]">
            <Image src={image1} alt="image" />
          </figure>
          <figure className="relative w-[300px]">
            <Image src={womenSliderImage} alt="image" />
          </figure>
          <figure className="relative w-[300px]">
            <Image src={image4} alt="image" />
          </figure>
          <figure className="relative w-[300px]">
            <Image src={image5} alt="image" />
          </figure>
          <figure className="relative w-[300px]">
            <Image src={image8} alt="image" />
          </figure>
          <figure className="relative w-[300px]">
            <Image src={image9} alt="image" />
          </figure>
          <figure className="relative w-[300px]">
            <Image src={womenSliderImage} alt="image" />
          </figure>
          <figure className="relative w-[300px]">
            <Image src={image1} alt="image" />
          </figure>
          <figure className="relative w-[300px]">
            <Image src={image5} alt="image" />
          </figure>
          <figure className="relative w-[300px]">
            <Image src={image4} alt="image" />
          </figure>
        </Masonry>
      </div>
    </div>
  </div>
);
