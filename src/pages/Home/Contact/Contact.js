import React from "react";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import contact from "../../../assets/images/appointment.png";

const Contact = () => {
  return (
    <div
      className="text-center py-10"
      style={{
        background: `url(${contact})`,
      }}
    >
      <h2 className="text-lg font-bold text-secondary mb-4">Contact Us</h2>
      <p className="text-4xl mb-4 text-white">Stay contacted with us</p>
      <form className="my-8">
        <input
          type="text"
          placeholder="Email Address"
          className="input w-full max-w-xs block mx-auto my-4"
        />
        <input
          type="text"
          placeholder="Subject"
          className="input w-full max-w-xs block mx-auto mb-4"
        />
        <textarea
          className="textarea w-full max-w-xs block mx-auto mb-12"
          placeholder="Your Message"
        ></textarea>
        <PrimaryButton>Submit</PrimaryButton>
      </form>
    </div>
  );
};

export default Contact;
