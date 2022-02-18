import React from "react";

const convertUTCDateToLocalDate = (date) => {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
};

const Details = ({ accessContent }) => {
  return (
    <div className="max-w-screen min-h-screen p-10">
      {accessContent.length === 0 && (
        <div className="text-red-500 text-3xl">
          <h1>No data found!</h1>
        </div>
      )}
      {accessContent.length > 0 && (
        <div className="text-red-500 text-3xl text-center mb-5">
          <h1>Access Details Page</h1>
        </div>
      )}
      <div className="grid grid-cols-5 gap-10">
        {accessContent.length > 0 &&
          accessContent.map((user, index) => (
            <div
              className="max-w-fit shadow-md p-5 flex flex-col items-center justify-center space-y-3"
              key={index}
            >
              <p>IP: {user.ip}</p>
              <p>
                Date:{" "}
                {convertUTCDateToLocalDate(
                  new Date(user.timestamp)
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Details;
