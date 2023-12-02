import { AxiosInstance } from 'axios';
import useSwr, { SWRConfiguration, SWRResponse } from 'swr';
import {
  CartResponse,
  CustomerResponse,
  OrderResponse,
  ProductsResponse,
  SingleProductResponse,
} from '../types/responseTypes';

export type Requests = ReturnType<typeof makeRequests>;
export type Response<Test extends keyof Requests> = Awaited<
  ReturnType<Requests[Test]>
>;

type productFilterOption = {
  type: string;
  price: string;
  priceMin: number;
  priceMax: number;
};

function request(requests: Requests) {
  return {
    useGetProducts: (
      params: {
        category: string;
        filterOptions?: productFilterOption;
      },
      options?: SWRConfiguration
    ): SWRResponse<ProductsResponse> => {
      return useSwr(['useGetProducts'], () => requests.useGetProducts(params));
    },
    useGetCustomerByCustomerId: (
      id: string | null
    ): SWRResponse<CustomerResponse> => {
      return useSwr(['useGetCustomerByCustomerId'], () =>
        requests.useGetCustomerByCustomerId(id)
      );
    },
    useGetOrdersByCustomerId: (id: string): SWRResponse<OrderResponse> => {
      return useSwr(['getOrderByOrderId'], () =>
        requests.useGetOrdersByCustomerId(id)
      );
    },
    useUpdateCustomerByCustomerId: (id: string, data: CustomerResponse) => {
      return useSwr(['useUpdateCustomerByCustomerId'], () =>
        requests.useUpdateCustomerByCustomerId(id, data)
      );
    },
    useUpdateCartByCartId: (id: string, data: CartResponse) => {
      return useSwr(['useUpdateCartByCartId'], () =>
        requests.useUpdateCartByCartId(id, data)
      );
    },
    useGetProductByProductId: (
      id: string
    ): SWRResponse<SingleProductResponse> => {
      return useSwr(['useGetProductByProductId'], () =>
        requests.useGetProductByProductId(id)
      );
    },
    useGetCartByUserId: (id?: string): SWRResponse<CartResponse> => {
      return useSwr(
        id && ['useGetCartByUserId'],
        () => id && requests.useGetCartByUserId(id)
      );
    },
  };
}

function makeRequests(axios: AxiosInstance) {
  return {
    useGetProducts: (params: {
      category: string;
      filterOptions?: productFilterOption;
    }) =>
      axios
        .request({
          method: 'get',
          url: `http://localhost:5001/products/${params.category.toLowerCase()}`,
          params: {
            ...(params.filterOptions !== undefined && {
              ...Object.entries(params.filterOptions).reduce(
                (acc, [key, value]) =>
                  value !== undefined ? { ...acc, [key]: value } : acc,
                {}
              ),
            }),
          },
        })
        .then((res) => res.data),
    useGetCustomerByCustomerId: (id: string | null) =>
      axios
        .request({
          method: 'get',
          url: `http://localhost:5001/customer/${id}`,
        })
        .then((res) => res.data),
    useGetOrdersByCustomerId: (id: string) =>
      axios
        .request({
          method: 'get',
          url: `http://localhost:5001/get-order/${id}`,
        })
        .then((res) => res.data),
    useUpdateCustomerByCustomerId: (id: string, data: CustomerResponse) =>
      axios.request({
        method: 'patch',
        url: `http://localhost:5001/customer/${id}`,
        data: data,
      }),
    useUpdateCartByCartId: (id: string, data: CartResponse) =>
      axios.request({
        method: 'patch',
        url: `http://localhost:5001/update-cart/${id}`,
        data: data,
      }),
    useGetProductByProductId: (id: string) =>
      axios
        .request({
          method: 'get',
          url: `http://localhost:5001/product/${id}`,
        })
        .then((res) => res.data),
    useGetCartByUserId: (id: string) =>
      axios
        .request({
          method: 'get',
          url: `http://localhost:5001/get-cart/${id}`,
        })
        .then((res) => res.data),
  };
}

export function initilize(axios: AxiosInstance) {
  const requestInit = makeRequests(axios);

  return {
    requests: request(requestInit),
  };
}
