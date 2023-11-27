import { AxiosInstance } from 'axios';
import useSwr, { SWRConfiguration, SWRResponse } from 'swr';
import {
  CartResponse,
  CustomerResponse,
  OrderResponse,
  ProductsResponse,
} from '../types/responseTypes';

export type Requests = ReturnType<typeof makeRequests>;
export type Response<Test extends keyof Requests> = Awaited<
  ReturnType<Requests[Test]>
>;

function request(requests: Requests) {
  return {
    useGetProducts: (
      category: string,
      options?: SWRConfiguration
    ): SWRResponse<ProductsResponse> => {
      return useSwr(['useGetProducts'], () =>
        requests.useGetProducts(category)
      );
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
    useGetProductByProductId: (id: string): SWRResponse<ProductsResponse> => {
      return useSwr(['useGetProductByProductId'], () =>
        requests.useGetProductByProductId(id)
      );
    },
  };
}

function makeRequests(axios: AxiosInstance) {
  return {
    useGetProducts: (category: string) =>
      axios
        .request({
          method: 'get',
          url: `http://localhost:5001/products/${category}`,
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
  };
}

export function initilize(axios: AxiosInstance) {
  const requestInit = makeRequests(axios);

  return {
    requests: request(requestInit),
  };
}
