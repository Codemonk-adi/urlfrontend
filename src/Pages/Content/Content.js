import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import Spinner from "../../components/Spinner/Spinner";
import axios from "../../helpers/axios";
import Exclamation from "../../SVG/exclamation";
import Tick from "../../SVG/tick";

const Content = () => {
  const { queryId, isEncrypted } = useParams();
  const [enteredKey, setEnteredKey] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const getContentAPI = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://my-poly.herokuapp.com/admin/host`,
        {
          queryid: queryId,
          key: enteredKey,
        }
      );
      console.log("Response", response);
      setContent(response.data.Data);
      setIsLoading(false);
      setEnteredKey("");
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

  const submitButtonHandler = () => {
    getContentAPI();
  };

  return (
    <div>
      {content && (
        <div className="text-lg font-light text-blue-400 max-w-xl border-2 border-gray-300 rounded-md mx-auto mt-20 p-5">
          <h1 className="text-xl font-semibold mb-5 text-blue-700">Content:</h1>
          <span
            className="cursor-pointer hover:underline font-medium hover:text-blue-700"
            onClick={() => window.open(content, "_blank")}
          >
            {content}
          </span>
        </div>
      )}
      <div className="shadow-md w-96 px-5 pt-10 pb-5 mx-auto mt-20 flex flex-col space-y-10 items-center justify-center">
        {isEncrypted === "true" && (
          <div className="border-2 border-gray-300 rounded-md w-full px-8 py-3">
            <input
              placeholder="Enter encryption key"
              type="text"
              className="w-full focus:outline-none bg-transparent"
              value={enteredKey}
              onChange={(e) => setEnteredKey(e.target.value)}
              name="encryption-key"
            />
          </div>
        )}
        <div
          className="bg-blue-text w-full text-center cursor-pointer"
          onClick={submitButtonHandler}
        >
          <Button type="submit">
            <span>Get Content</span>
            {isLoading && (
              <span>
                <Spinner />
              </span>
            )}
          </Button>
        </div>
        {isModalOpen && (
          <ConfirmationModal
            message={message}
            Icon={message.heading === "Error" ? Exclamation : Tick}
            onCloseModal={onCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default Content;
