import { QueryOptionsType, Blog} from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import {useInfiniteQuery, useQuery} from 'react-query';

const fetchBlogs = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.BLOGS);
  return data;
};

const useBlogsQuery = (options: QueryOptionsType) => {
  return useQuery<any, Error>(
      [API_ENDPOINTS.BLOGS, options],
      fetchBlogs
  );
};

export { useBlogsQuery, fetchBlogs };
