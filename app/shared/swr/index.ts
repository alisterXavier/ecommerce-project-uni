import { AxiosInstance } from 'axios';
import useSwr, { SWRConfiguration, SWRResponse } from 'swr';
import {
  CartResponse,
  CustomerResponse,
  OrderResponse,
  ProductsResponse,
  SingleProductResponse,
} from '../types/responseTypes';
import { CartUpdate } from '../types/requestTypes';

export type Requests = ReturnType<typeof makeQueries>;
export type Response<Test extends keyof Requests> = Awaited<
  ReturnType<Requests[Test]>
>;

type productFilterOption = {
  type: string[];
  price: string;
};

function queries(requests: Requests) {
  return {
    useGetProducts: (
      params: {
        category: string;
        filterOptions?: productFilterOption;
      },
      options?: SWRConfiguration
    ): SWRResponse<ProductsResponse> => {
      return useSwr(['useGetProducts' + params.category], () =>
        requests.useGetProducts(params)
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

function makeQueries(axios: AxiosInstance) {
  return {
    useGetProducts: (params: {
      category: string;
      filterOptions?: productFilterOption;
    }) =>
      axios
        .request({
          method: 'get',
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${params.category.toLowerCase()}`,
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
    useGetProductByProductId: (id: string) =>
      axios
        .request({
          method: 'get',
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`,
        })
        .then((res) => res.data),
    useGetCustomerByCustomerId: (id: string | null) =>
      axios
        .request({
          method: 'get',
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/customer/${id}`,
        })
        .then((res) => res.data),
    // TODO --- backend endpoint not created
    // useUpdateCustomerByCustomerId: (id: string, data: CustomerResponse) =>
    //   axios.request({
    //     method: 'patch',
    //     url: `${process.env.NEXT_PUBLIC_SERVER_URL}/customer/${id}`,
    //     data: data,
    //   }),
    // useUpdateCartByCartId: (data: CartResponse['data']) =>
    //   axios
    //     .request({
    //       method: 'patch',
    //       url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
    //       data: data,
    //     })
    //     .then((res) => res.data),
    useGetCartByUserId: (id: string) =>
      axios
        .request({
          method: 'get',
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/${id}`,
        })
        .then((res) => res.data),
    // TODO --- backend endpoint not created
    useGetOrdersByCustomerId: (id: string) =>
      axios
        .request({
          method: 'get',
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/order/${id}`,
        })
        .then((res) => res.data),
  };
}

function makeRequests(axios: AxiosInstance) {
  return {
    useUpdateCustomerByCustomerId: (id: string, data: CustomerResponse) =>
      axios.request({
        method: 'patch',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/customer/${id}`,
        data: data,
      }),
    useUpdateCartByCartId: (data: CartUpdate) =>
      axios
        .request({
          method: 'patch',
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          data: data,
        })
        .then((res) => res.data),
  };
}

export function initilize(axios: AxiosInstance) {
  const queriesInit = makeQueries(axios);
  const requestInit = makeRequests(axios);
  return {
    queries: queries(queriesInit),
    requests: requestInit,
  };
}
