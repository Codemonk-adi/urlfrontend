import React from "react";

import classes from "./fileUploader.module.css";
import Search from "../../SVG/search";

const FileUploader = ({ files, setFiles, enteredText,placeholder }) => {
  // let FILE_SIZE;

  const handleFileChange = (e) => {
    let allFiles = e.target.files;
    let filesArr = Array.prototype.slice.call(allFiles);
    setFiles([...files, ...filesArr]);

    // FILE_SIZE = Math.ceil(e.target.files[0].size / (1026 * 1026));
    // if (FILE_SIZE > 4) {
    //   setFileName(
    //     "File too big. Upload files of size less than or equal to 4MB"
    //   );
    //   selectFile(null);
    // } else {

    //   selectFile(e.target.files[0]);
    // }
    // console.log("FILE_SIZE in MB", FILE_SIZE);
  };
  //console.log("files from uploader", files);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="mb-1 w-100">
        <input
          disabled={enteredText !== ""}
          className={classes.custom}
          type="file"
          multiple
          name="FileData"
          id="FileData"
          onChange={handleFileChange}
          accept=".nii,.nii.gz"
        />
        <label
          htmlFor="FileData"
          className="flex items-center justify-center space-x-1 shadow-lg bg-white cursor-pointer py-3 px-3 border border-gray-300 rounded-md leading-4 font-medium text-gray-700 hover:text-green-500 hover:border-green-300 focus:outline-none focus:border-green-300 focus:shadow-outline-green active:bg-gray-50 active:text-green-800"
        >
          <Search />
          <span>{placeholder}</span>
        </label>
      </div>
      {files.length > 0 && (
        <span className="bg-blue-200 px-3 py-1 rounded-sm">
          {files[0].name}
        </span>
      )}
      {enteredText && (
        <span className="bg-blue-200 px-3 py-1 rounded-sm">
          You can enter text or upload file
        </span>
      )}
    </div>
  );
};

export default FileUploader;
