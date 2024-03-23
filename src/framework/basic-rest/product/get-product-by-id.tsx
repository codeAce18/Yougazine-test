import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchProduct = async (_id: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.PRODUCT}?id=${_id}`);
  return data.data;
};
export const useProductByIdQuery = (id: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCT, id], () =>
    fetchProduct(id)
  );
};
