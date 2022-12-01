import React from "react";
import doctor from "../../../assets/images/doctor-small.png";
import appointment from "../../../assets/images/appointment.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const MakeAppointment = () => {
  return (
    <section
      className="mt-32"
      style={{
        background: `url(${appointment})`,
      }}
    >
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={doctor}
            className="hidden md:block lg:w-1/2 rounded-lg -mt-36"
            alt=""
          />
          <div>
            <h1 className="text-lg font-bold text-secondary mb-2">
              Appointment
            </h1>
            <h1 className="text-4xl font-semibold text-white">
              Make an appointment Today
            </h1>
            <p className="py-6 text-white">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
            <PrimaryButton>Appointment</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeAppointment;
