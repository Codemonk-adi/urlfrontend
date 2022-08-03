import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Spinner from "../../components/Spinner/Spinner";
import axios from "../../helpers/axios";
import Exclamation from "../../SVG/exclamation";
import Tick from "../../SVG/tick";

const UserHistory = ({ setAccessContent }) => {
  const [isMainPageLoading, setIsMainPageLoading] = useState(false);
  const [isLoadingRenew, setIsLoadingRenew] = useState({ id: null });
  const [isLoadingDelete, setIsLoadingDelete] = useState({ id: null });
  const [isLoadingAccess, setIsLoadingAccess] = useState({ id: null });

  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [allHistory, setAllHistory] = useState([]);
  const navigate = useNavigate();

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const getHistoryAPI = async () => {
    try {
      setIsMainPageLoading(true);
      const response = await axios.get(
        `https://consise-farms.herokuapp.com/admin/track`
      );
      console.log("Response", response);
      setAllHistory([...response.data]);
      setIsMainPageLoading(false);
    } catch (err) {
      setIsMainPageLoading(true);
      console.log(err);
      setIsMainPageLoading(false);
    }
  };

  const renewContentAPI = async (id) => {
    try {
      setIsLoadingRenew({ id: id });
      const response = await axios.post(
        `https://consise-farms.herokuapp.com/admin/renew`,
        { queryid: id }
      );
      console.log("Response", response);

      setMessage({
        heading: "Success!",
        text: `Renewed Successfully!`,
      });
      setIsLoadingRenew({ id: null });
      setIsModalOpen(true);
    } catch (err) {
      setIsLoadingRenew({ id: id });
      setMessage({
        heading: "Error!",
        text: `Something went wrong. Please try again!`,
      });
      setIsLoadingRenew({ id: null });
      setIsModalOpen(true);
    }
  };

  const deleteContentAPI = async (id) => {
    try {
      setIsLoadingDelete({ id: id });
      const response = await axios.post(
        `https://consise-farms.herokuapp.com/admin/delete`,
        { queryid: id }
      );
      console.log("Response", response);

      setMessage({
        heading: "Success!",
        text: `Deleted Successfully!`,
      });
      setIsLoadingDelete({ id: null });
      setIsModalOpen(true);
      window.location.reload();
    } catch (err) {
      setIsLoadingDelete({ id: id });
      setMessage({
        heading: "Error!",
        text: `Something went wrong. Please try again!`,
      });
      setIsLoadingDelete({ id: null });
      setIsModalOpen(true);
    }
  };

  const detailsContentAPI = async (id) => {
    try {
      setIsLoadingAccess({ id: id });
      const response = await axios.post(
        `https://consise-farms.herokuapp.com/admin/details`,
        { queryid: id }
      );
      console.log("Response details", response);
      setAccessContent([...response?.data?.sorted]);
      setIsLoadingAccess({ id: null });

      if (response) {
        navigate("/details");
      }
    } catch (err) {
      setIsLoadingAccess({ id: id });
      setMessage({
        heading: "Error!",
        text: `Something went wrong. Please try again!`,
      });
      setIsLoadingAccess({ id: null });
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    getHistoryAPI();
  }, []);

  return (
    <div className="max-w-screen min-h-screen p-10">
      {isMainPageLoading && <LoadingSpinner />}
      {!isMainPageLoading && allHistory.length === 0 && (
        <div className="text-red-500 text-3xl">
          <h1>No data found!</h1>
        </div>
      )}
      {!isMainPageLoading && allHistory.length > 0 && (
        <div className="text-red-500 text-3xl text-center mb-5">
          <h1>User History Data</h1>
        </div>
      )}
      <div className="grid grid-cols-2 gap-10">
        {allHistory.length > 0 &&
          !isMainPageLoading &&
          allHistory.map((user) => (
            <div
              className="max-w-md shadow-md p-10 flex flex-col items-center justify-center space-y-10"
              key={user.id}
            >
              <div className="bg-blue-300 px-3 py-2 max-w-fit text-center cursor-pointer text-lg text-white hover:text-blue-600">
                <a target="_blank" href={user.url} rel="noopener noreferrer">
                  Link: {user.url}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  onClick={() => renewContentAPI(user.id)}
                  className="bg-pink-500 text-center cursor-pointer"
                >
                  <Button
                    type="submit"
                    disabled={isLoadingRenew.id === user.id}
                  >
                    <span>Renew</span>
                    {isLoadingRenew.id === user.id && (
                      <span>
                        <Spinner />
                      </span>
                    )}
                  </Button>
                </div>
                <div
                  className="bg-red-500 text-center cursor-pointer"
                  onClick={() => deleteContentAPI(user.id)}
                >
                  <Button
                    type="submit"
                    disabled={isLoadingDelete.id === user.id}
                  >
                    <span>Delete</span>
                    {isLoadingDelete.id === user.id && (
                      <span>
                        <Spinner />
                      </span>
                    )}
                  </Button>
                </div>
                <div className="bg-blue-500 text-center cursor-pointer">
                  <Button
                    type="submit"
                    disabled={isLoadingAccess.id === user.id}
                    onClick={() => detailsContentAPI(user.id)}
                  >
                    <span>Access Details</span>
                    {isLoadingAccess.id === user.id && (
                      <span>
                        <Spinner />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
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

export default UserHistory;
