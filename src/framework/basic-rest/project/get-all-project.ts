import { QueryOptionsType, Order } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

const fetchProjects = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.PROJECTS);
  return {
    data: data.data,
  };
};

const useProjectsQuery = (options: QueryOptionsType) => {
  return useQuery([API_ENDPOINTS.PROJECTS, options], fetchProjects);
};

export { useProjectsQuery, fetchProjects };
