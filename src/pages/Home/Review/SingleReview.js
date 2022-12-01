import React from "react";

const SingleReview = ({ review }) => {
  const { name, img, address, description } = review;
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <p>{description}</p>
        <div className="flex items-center mt-9">
          <img
            src={img}
            alt=""
            className="border-4 rounded-full border-secondary"
          />
          <div className="ml-4">
            <p className="text-lg font-semibold">{name}</p>
            <p>{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
