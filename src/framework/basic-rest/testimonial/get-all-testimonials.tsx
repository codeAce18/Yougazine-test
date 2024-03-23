import { QueryOptionsType, Blog} from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import {useInfiniteQuery, useQuery} from 'react-query';

const fetchTestimonials = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.TESTIMONIALS);
  console.log(data);
  return { ...data };
};

const useTestimonialsQuery = (options: QueryOptionsType) => {
  return useQuery<{ data: any }, Error>(
      [API_ENDPOINTS.TESTIMONIALS, options],
      fetchTestimonials
  );
};

export { useTestimonialsQuery, fetchTestimonials };
