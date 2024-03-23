import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchProduct = async (category: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.PRODUCT}?category=${category}`);
  return data.data;
};
export const useProductByCategoryQuery = (category: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCT, category], () =>
    fetchProduct(category)
  );
};
