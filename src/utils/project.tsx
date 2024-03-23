import { useModalAction } from '@components/common/modal/modal.context';
import { useUI } from '@contexts/ui.context';
import { useProjectFoldersQuery } from '@framework/project/get-project-folders';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { getToken } from '@framework/utils/get-token';
import http from '@framework/utils/http';
import { AxiosHeaders } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

interface FolderFormValues{
  folderName: string;
  project_id:string
  parent_folder:string
}

interface FilesFormValues{
  projectfolder_id:any;
  project_id:any;
  selectedFile:any
}

interface FolderSubmit{
  slug:any
}


// ADD FOLDER
async function addFolder(input: FolderFormValues) {
  try {
    const {data} = await http.post(API_ENDPOINTS.PROJECTFOLDER, {
      "project_id" : input.project_id,
      "name": input.folderName,
      "parent_folder": input.parent_folder
    });
    if(!data.data.success) {
      throw data;
    }
    return {
      token: data.data.data.token,
    };
  }
  catch(err) {
    console.log(err);
    throw(err);
  }
}


export const useAddFolderMutation = () => {
  const { closeModal, openModal } = useModalAction();
  const {setRefetch} = useUI();
  return useMutation((input: FolderFormValues) => addFolder(input), {
    onSuccess: (data) => {
      toast("Folder Added Successfully", {
        progressClassName: 'danger',
        position:  'top-center' ,
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closeModal();
      setRefetch(true);
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};


// SUBMIT FOLDER

async function submitFolder(input: FolderSubmit) {
  try {

    const {data} = await http.post(API_ENDPOINTS.FOLDER, {
      id:input.slug
    });
    if(!data.data.success) {
            toast(data.data.message, {
            progressClassName: 'danger',
            position:  'top-center' ,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
      console.log('Came hEre');
      throw data;
      
    }
    return {
      token: data.data.data.token,
    };
  }
  catch(err) {
    console.log(err);
    throw(err);
  }
}


export const useSubmitFolderMutation = () => {
  const { closeModal, openModal } = useModalAction();
  return useMutation((input:FolderSubmit) => submitFolder(input), {
    onSuccess: (data) => {
      toast("Folder Submitted Successfully", {
        progressClassName: 'danger',
        position:  'top-center' ,
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};


// ADD FILES

async function addFiles(input: FilesFormValues) {
  try {
    const formData = new FormData();
    formData.append('projectfolder_id', input.projectfolder_id);
    formData.append('project_id', input.project_id);
    for (let i=0; i <input.selectedFile.length; i++) {
      formData.append('project_files', input.selectedFile[i]);
    }
    console.log(formData);
    var headers = new AxiosHeaders();
    headers.setContentType('multipart/formdata');
    headers.setAuthorization(`Bearer ${getToken()}`);
    const {data} = await http.post(API_ENDPOINTS.PROJECTFILES, formData, {headers});
    if(!data.success) {
      throw data;
    }
    return data;
  }
  catch(err) {
    console.log(err);
    throw(err);
  }
}


export const useAddFilesMutation = () => {
  const { closeModal, openModal } = useModalAction();
  const {setRefetch} = useUI();
  return useMutation((input: FilesFormValues) => addFiles(input), {
    onSuccess: (data) => {
      toast("File Added Successfully", {
        progressClassName: 'danger',
        position:  'top-center' ,
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closeModal();
      setRefetch(true);
    },
    onError: (data: any) => {
      console.log(data, 'login error response');
      toast(data?.message || 'Some error occurred. Please try again.', {
        progressClassName: 'danger',
        position:  'top-center' ,
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closeModal();
    },
  });
};




// ADD PROJECT


async function addProject(input: FolderFormValues) {
  try {
    const {data} = await http.post(API_ENDPOINTS.PROJECTFOLDER, {
      "project_id" : "input.slug",
      "name": input.folderName,
      "parent_folder": ""
    });
    if(!data.data.success) {
            toast(data.data.message, {
            progressClassName: 'danger',
            position:  'top-center' ,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
      console.log('Came hEre');
      throw data;
      
    }
    return {
      token: data.data.data.token,
    };
  }
  catch(err) {
    console.log(err);
    throw(err);
  }
  
}
export const useCreateProjectMutation = () => {
  const { closeModal, openModal } = useModalAction();
  return useMutation((input: FolderFormValues) => addProject(input),{
    onSuccess: (data) => {
      toast("Folder Added Successfully", {
        progressClassName: 'danger',
        position:  'top-center' ,
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};



// GET ALL PROJECT FILES

async function getProjectFiles(input: any) {
  try {
    const {data} = await http.get(API_ENDPOINTS.PROJECTFILES, {

    });
    if(!data.data.success) {
            toast(data.data.message, {
            progressClassName: 'danger',
            position:  'top-center' ,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
      console.log('Came hEre');
      throw data;
      
    }
    return {
      token: data.data.data.token,
    };
  }
  catch(err) {
    console.log(err);
    throw(err);
  }
  
}
export const useGetAllProjectFilesMutation = () => {
  const { closeModal, openModal } = useModalAction();
  return useMutation((input: any) => getProjectFiles(input),{
    onSuccess: (data) => {
      toast("Folder Added Successfully", {
        progressClassName: 'danger',
        position:  'top-center' ,
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
