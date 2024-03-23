import { useModalAction, useModalState } from "@components/common/modal/modal.context";
import Button from "@components/ui/button";
import { useAddFilesMutation } from "@utils/project";
import { GetServerSideProps, NextPage } from "next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  dirs: string[];
}

const AddProjectFiles: NextPage<Props> = ({ dirs }) => {
  const {mutate:addFiles , isLoading} = useAddFilesMutation()
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileList>();
  const { data:project_id } = useModalState();
  const { closeModal } = useModalAction();
  const url= usePathname()
  const projectfolder_id = url.split('/').pop()


  const handleUpload = async () => {
    if (!selectedFile) return;
    addFiles({projectfolder_id,project_id,selectedFile})
  };

  return (
    <div className="bg-white w-full px-5 py-6 mx-auto rounded-lg sm:p-8 bg-brand-light sm:w-96 md:w-450px">
    <div className=" flex flex-col items-center max-w-4xl mx-auto p-2 space-y-6">
      <label>
        <input
          type="file"
          multiple
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectedFile(target?.files);
            }
          }}
        />
        <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
          {selectedFile && selectedFile?.length > 0 ? (
            <span>{selectedFile.length} File(s) Selected</span>
          ) : (
            <span>Select File</span>
          )}
        </div>
      </label>
      <Button
        onClick={handleUpload}
        disabled={isLoading}
        loading={isLoading}
        style={{ opacity: isLoading ? ".5" : "1" }}
        className="p-3 w-32 text-center rounded text-white"
      >
        {isLoading ? "Uploading.." : "Upload"}
      </Button>
    </div>
    </div>
  );
};
export default AddProjectFiles;