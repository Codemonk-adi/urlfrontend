import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import FileUploader from "../../components/FileUploader/FileUploader";
import Spinner from "../../components/Spinner/Spinner";
import axios from "../../helpers/axios";
import Exclamation from "../../SVG/exclamation";
import Tick from "../../SVG/tick";

const Home = () => {
  const [enteredText, setEnteredText] = useState("");
  const [files, setFiles] = useState([]);
  const [enteredKey, setEnteredKey] = useState("");
  const [url, setUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const uploadFilesAPI = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://consise-farms.herokuapp.com/admin/generateUrl`,
        data
      );
      // console.log("Response", response);
      var a = document.createElement("a");
      // // const resp = await response.data.blob();
      a.href = window.URL.createObjectURL(response.data);
      a.download = "result.nii.gz";
      a.click();

      setUrl(response?.data?.URL);
      setMessage({
        heading: "Success!",
        text: `Congraulations! Your file/files have been successfully uploaded to your dashboard.`,
      });
      setIsLoading(false);
      setEnteredText("");
      setFiles([]);
      setEnteredKey("");
      setIsModalOpen(true);
    } catch (err) {
      setIsLoading(true);
      console.log(err);
      setMessage({
        heading: "Error!",
        text: `Something went wrong. Please try again!`,
      });
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  const formData = new FormData();
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    formData.append("evaluate", checked);
  }

  const submitButtonHandler = () => {
    if (files.length === 0) {
      uploadFilesAPI({ data: enteredText, key: enteredKey });
    } else {
      uploadFilesAPI(formData);
    }
  };

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-10 shadow-lg my-10 max-w-3xl p-10 mx-auto">
      <div
        style={{ minHeight: "15rem" }}
        className="border-2 border-gray-300 w-full rounded-md p-5"
      >
        <textarea
          placeholder={
            files.length === 0
              ? "Input or paste code snippets"
              : "You can either enter text or upload a file"
          }
          style={{ resize: "none" }}
          className="w-full focus:outline-none bg-transparent"
          value={enteredText}
          onChange={(e) => setEnteredText(e.target.value)}
          name="code-snippets"
          disabled={files.length > 0}
        />
      </div>
      <div>
        <FileUploader
          files={files}
          setFiles={setFiles}
          enteredText={enteredText}
          placeholder="Select Image to be segmented"
        />
      </div>
      <div className="border-2 border-gray-300 rounded-md w-80 px-8 py-3">
        <input
          id="checkbox"
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          />
        <label for="checkbox">
        Evaluate Model
      </label>
    </div>
      {checked?<div>
        <FileUploader
          files={files}
          setFiles={setFiles}
          enteredText={enteredText}
          placeholder="Select Mask to evaluate the segmentation"
        />
      </div> : null}
      <div
        className="bg-blue-text w-40 text-center cursor-pointer"
        onClick={submitButtonHandler}
      >
        <Button type="submit">
          <span>Submit</span>
          {isLoading && (
            <span>
              <Spinner />
            </span>
          )}
        </Button>
      </div>
      {url && (
        <div className="bg-blue-300 px-3 py-2 max-w-fit text-center cursor-pointer text-lg text-white hover:text-blue-600">
          <a target="_blank" href={url} rel="noopener noreferrer">
            Link: {url}
          </a>
        </div>
      )}
      {isModalOpen && (
        <ConfirmationModal
          message={message}
          Icon={message.heading === "Error" ? Exclamation : Tick}
          onCloseModal={onCloseModal}
        />
      )}
    </div>
  );
};

export default Home;
