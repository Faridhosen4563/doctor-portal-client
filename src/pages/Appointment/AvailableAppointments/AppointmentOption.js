import React from "react";

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
  const { name, price, slots } = appointmentOption;
  return (
    <div className="card  shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title font-bold text-secondary">{name}</h2>
        <p>{slots.length > 0 ? slots[0] : "Try Another Day"}</p>
        <p>
          {slots.length} {slots.length > 1 ? "SPACES" : "SPACE"} AVAILABLE
        </p>
        <p>Price : ${price}</p>
        <div className="card-actions">
          <label
            disabled={slots.length === 0}
            onClick={() => setTreatment(appointmentOption)}
            htmlFor="booking-modal"
            className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white"
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
