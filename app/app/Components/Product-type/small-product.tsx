import React, { useContext } from 'react';

import { useRouter } from 'next/navigation';


interface SmallProps {
  children: React.ReactNode;
  id: number;
}
const Small: React.FC<SmallProps> = ({ children, id }) => {
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
      <div className="small-transition-container w-full h-full">{children}</div>
    </div>
  );
};

export default Small;
