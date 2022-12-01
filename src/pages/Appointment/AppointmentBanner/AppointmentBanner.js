import { format } from "date-fns";
import React from "react";
import { DayPicker } from "react-day-picker";
import chair from "../../../assets/images/chair.png";
import banner from "../../../assets/images/bg.png";

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <header
      className="my-20 py-28"
      style={{
        background: `url(${banner})`,
        backgroundSize: "contain",
      }}
    >
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={chair}
            className="lg:w-1/2 rounded-lg shadow-2xl"
            alt="Dentist Chair"
          />
          <div className="mx-auto">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  setSelectedDate(date);
                }
              }}
            />
            ;<p>Your pick date is : {format(selectedDate, "PP")}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentBanner;
