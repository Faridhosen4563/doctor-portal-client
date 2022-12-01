import React from "react";
import Banner from "../Banner/Banner";
import Contact from "../Contact/Contact";
import Dental from "../Dental/Dental";
import InfoCards from "../InfoCards/InfoCards";
import MakeAppointment from "../MakeAppointment/MakeAppointment";
import Review from "../Review/Review";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div className="mx-5">
      <Banner></Banner>
      <InfoCards></InfoCards>
      <Services></Services>
      <Dental></Dental>
      <MakeAppointment></MakeAppointment>
      <Review></Review>
      <Contact></Contact>
    </div>
  );
};

export default Home;
