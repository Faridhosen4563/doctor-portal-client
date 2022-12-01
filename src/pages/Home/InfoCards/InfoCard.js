import React from "react";

const InfoCard = ({ card }) => {
  const { name, icon, bgClass, description } = card;
  return (
    <div
      className={`px-6 py-8 text-white card md:card-side shadow-xl ${bgClass}`}
    >
      <figure>
        <img src={icon} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
