import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentOption from "./AppointmentOption";

const AvailableAppointments = ({ selectedDate }) => {
  // const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] = useState(null);
  const date = format(selectedDate, "PP");

  const { data: appointmentOptions = [], refetch } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_API_URL}/appointmentOptions?date=${date}`
      ).then((res) => res.json()),
  });

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/appointmentOptions`)
  //     .then((res) => res.json())
  //     .then((data) => setAppointmentOptions(data));
  // }, []);
  return (
    <div className="my-20">
      <p className="text-center text-lg font-bold text-secondary">
        Available Appointments on {format(selectedDate, "PP")}
      </p>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6">
        {appointmentOptions.map((option) => (
          <AppointmentOption
            key={option._id}
            appointmentOption={option}
            setTreatment={setTreatment}
          ></AppointmentOption>
        ))}
      </div>
      {treatment && (
        <BookingModal
          treatment={treatment}
          selectedDate={selectedDate}
          setTreatment={setTreatment}
          refetch={refetch}
        ></BookingModal>
      )}
    </div>
  );
};

export default AvailableAppointments;
