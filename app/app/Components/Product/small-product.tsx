import React, { useContext } from 'react';
import { selectedProduct } from '@/app/page';
import { useRouter } from 'next/navigation';

interface SmallProps {
  children: React.ReactNode;
  layoutId: number;
}
const Small: React.FC<SmallProps> = ({ children, layoutId }) => {
  const { selectedId, setSelectedId } = useContext(selectedProduct);
  const router = useRouter();
  const handleClick = () => {
    // setSelectedId(`${layoutId}`);
    router.push(`/Product/${layoutId}`);
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className="small-product-container"
    >
      <div className="small-transition-container">{children}</div>
    </div>
  );
};

export default Small;
