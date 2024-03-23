import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchProject = async (_slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.PROJECT}?slug=${_slug}`);
  return data.data;
};
export const useProjectQuery = (slug: string) => {
  return useQuery<any, Error>([API_ENDPOINTS.PROJECT, slug], () =>
  fetchProject(slug)
  );
};

// For all folders -> (NOT A FOLDER)
export const fetchProjectFolders = async (_slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.PROJECTFOLDER}?slug=${_slug}`);
  return data.data;
};
export const useProjectFoldersQuery = (slug: string) => {
  return useQuery<any, Error>([API_ENDPOINTS.PROJECTFOLDER, slug], () =>
  fetchProjectFolders(slug)
  );
};


// For all files
export const fetchProjectFiles = async (_slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.PROJECTFILES}?slug=${_slug}`);
  return data.data;
};
export const useProjectFilesQuery = (lastPathSegment: any) => {
  return useQuery<any, Error>([API_ENDPOINTS.PROJECTFILES, lastPathSegment], () =>
  fetchProjectFiles(lastPathSegment)
  );
};


// For all folders
export const fetchSingleProjectFolders = async (_slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.PROJECTFOLDER}?slug=${_slug}`);
  return data.data;
};
export const useGetAllProjectFoldersQuery = (lastPathSegment: any) => {
  return useQuery<any, Error>([API_ENDPOINTS.PROJECTFOLDER, lastPathSegment], () =>
  fetchSingleProjectFolders(lastPathSegment)
  );
};
