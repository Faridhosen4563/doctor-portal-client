import React from "react";
import img1 from "../../../assets/images/fluoride.png";
import img2 from "../../../assets/images/cavity.png";
import img3 from "../../../assets/images/whitening.png";
import Service from "./Service";
const Services = () => {
  const servicesData = [
    {
      id: 1,
      name: "Fluoride Treatment",
      description:
        "Fluoride works by restoring minerals to tooth surfaces where bacteria may have eroded the",
      icon: img1,
    },
    {
      id: 2,
      name: "Cavity Filling",
      description:
        "A cavity filling brings back the functionality and appearance of the tooth. Basically,  ",
      icon: img2,
    },
    {
      id: 3,
      name: "Teeth Whitening",
      description:
        "While there may sometimes be side effects, whitening treatment is safe on tooth enamel. ",
      icon: img3,
    },
  ];
  return (
    <div className="my-32">
      <div className="text-center">
        <h1 className="text-sm text-secondary mb-2 font-bold">OUR SERVICES</h1>
        <h2 className="text-3xl">Services We Provide</h2>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-16">
        {servicesData.map((service) => (
          <Service key={service.id} service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
