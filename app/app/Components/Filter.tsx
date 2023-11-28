import { Checkbox, CheckboxGroup } from '@mantine/core';
import { useState } from 'react';

type FilterProps = {
  type: string;
  filterByTypeFn: {
    filterByType: string;
    setFilterByType: (type: string) => void;
  };
  filterByPriceFn: {
    filterByPrice: string;
    setFilterByPrice: (type: string) => void;
  };
};

export const Filter = ({
  type,
  filterByTypeFn: {filterByType, setFilterByType},
  filterByPriceFn: {filterByPrice, setFilterByPrice},
}: FilterProps) => {
  return (
    <div className="sticky top-[11%] w-[200px] bg-[var(--nightBlue)] text-[white] rounded p-5 h-fit">
      <h1 className="text-[white] mt-0">Filter</h1>
      {type.toLowerCase() === 'electronics' ? (
        <></>
      ) : (
        <div className="">
          <div>
            <CheckboxGroup value={[filterByType]} label="By Type" p={5}>
              <Checkbox
                label="Jeans"
                value={'jeans'}
                onClick={(e) => setFilterByType(e.currentTarget.value)}
                mt={4}
                color="#bab4af"
              />
              <Checkbox
                className=""
                label="T-shirts"
                value={'t-shirts'}
                onClick={(e) => setFilterByType(e.currentTarget.value)}
                mt={4}
                color="#bab4af"
              />
              <Checkbox
                label="Shoes"
                value={'shoes'}
                onClick={(e) => setFilterByType(e.currentTarget.value)}
                mt={4}
                color="#bab4af"
              />
            </CheckboxGroup>
          </div>
          <div>
            <CheckboxGroup value={[filterByPrice]} label="By Price" p={5}>
              <Checkbox
                label="Low To High"
                value={'asc'}
                onClick={(e) => setFilterByPrice(e.currentTarget.value)}
                mt={4}
                color="#bab4af"
              />
              <Checkbox
                label="High to Low"
                value={'desc'}
                onClick={(e) => setFilterByPrice(e.currentTarget.value)}
                mt={4}
                color="#bab4af"
              />
            </CheckboxGroup>
          </div>
        </div>
      )}
    </div>
  );
};
