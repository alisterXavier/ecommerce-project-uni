import { useEffect, useState } from 'react';
import {
  CustomerResponse,
  ProductsResponse,
  SingleProductResponse,
} from '../types/responseTypes';
import { useSwrInstance } from '../swr/swrInit';

// const authContext: AuthContext = {
//   Authorization: `Bearer ${user?.tokenData?.accessToken ?? null}`,
// }

type useProductsProps = {
  parameters: {
    category: string;
    filterOptions?: string[];
  };
};
export const useProducts = ({ parameters }: useProductsProps) => {
  const [data, setData] = useState<ProductsResponse>({
    data: [],
  });
  console.log(parameters)
  const { requests } = useSwrInstance();

  const {
    data: productsGetData,
    error: productsError,
    isLoading: productsIsLoading,
  } = requests.useGetProducts(parameters);

  useEffect(() => {
    if (!productsIsLoading) {
      if (productsError || !productsGetData) throw new Error(productsError);
      else setData(productsGetData);
    }
  }, [productsGetData, productsIsLoading, productsError]);

  return {
    data,
    productsError,
    productsIsLoading,
  };
};

export const useGetUser = (id: string | undefined) => {
  const [data, setData] = useState<CustomerResponse>({
    data: {},
  });
  const { requests } = useSwrInstance();

  const {
    data: customerGetData,
    error: customerError,
    isLoading: customerIsLoading,
  } = requests.useGetCustomerByCustomerId(id ?? null);

  useEffect(() => {
    if (!customerIsLoading) {
      if (customerError || !customerGetData) return;
      else setData(customerGetData);
    }
  }, [customerError, customerGetData, customerIsLoading]);

  return {
    data,
    customerError,
    customerIsLoading,
  };
};

export const useProduct = (id: string) => {
  const { requests } = useSwrInstance();
  const [data, setData] = useState<SingleProductResponse['data']>(
    {} as SingleProductResponse['data']
  );
  const {
    data: productGetData,
    isLoading: productIsLoading,
    error: productError,
  } = requests.useGetProductByProductId(id);

  useEffect(() => {
    if (!productIsLoading) {
      if (productError) {
        console.log(
          '🚀 ~ file: products.ts:75 ~ useEffect ~ productError:',
          productError
        );
        return;
      } else if (productGetData) setData(productGetData.data);
    }
  }, [productError, productGetData, productIsLoading]);

  return {
    data,
    productError,
    productIsLoading,
  };
};
