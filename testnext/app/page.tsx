import Image from 'next/image';
import product from '@/public/productList.json';

// Example Data
// {
//   "title": "Rose Back Graphic T-shirt",
//   "image": "https://media.boohoo.com/i/boohoo/bmm50924_sage_xl/male-sage-plus-oversized-rose-back-graphic-t-shirt?w=450&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit",
//   "description": "Your tee collection just got an upgrade with this plus size tshirt for men from our latest collection. Cut with additional room for the perfect fit, this style has serious add-to-bag potential. With short sleeves and a classic neckline, this is a wardrobe staple we can't get enough of. Wear with jeans and trainers for a casual fit or layer under an open shirt for weekend plans.,
//   "price": "$50"
// }

export default function Home() {
  return (
    <div className="w-[250px] h-[300px] border border-black">
      <figure className="relative w-[100px] h-[200px]">
        {/* product image change the height of the figure tag and the image size will change automatically */}
        {/* <Image src={product.image} fill /> */}
      </figure>
      <div className="">
        {/* Use html tag to add the price description title and whatever needed to be displayed in here */}
      </div>
    </div>
  );
}
