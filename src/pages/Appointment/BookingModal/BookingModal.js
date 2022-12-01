import { format } from "date-fns";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
  const { user } = useContext(AuthContext);
  const { name, slots, price } = treatment;
  const date = format(selectedDate, "PP");

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const patient = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
      appointmentDate: date,
      treatment: name,
      slot,
      patient,
      email,
      phone,
      price,
    };

    fetch(`${process.env.REACT_APP_API_URL}/bookings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Bookings successfully delivered");
          refetch();
          setTreatment(null);
        } else {
          toast.error(data.message);
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="py-4 grid grid-cols-1 gap-3"
          >
            <input
              type="text"
              disabled
              defaultValue={date}
              className="input input-bordered w-full "
            />
            <select name="slot" className="select select-bordered w-full ">
              {slots.map((slot, idx) => (
                <option value={slot} key={idx}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              disabled
              defaultValue={user?.displayName}
              placeholder="Your Name"
              className="input input-bordered w-full "
            />
            <input
              type="email"
              name="email"
              disabled
              defaultValue={user?.email}
              placeholder="Email Address"
              className="input input-bordered w-full "
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full "
            />
            <input
              type="submit"
              className="btn btn-accent w-full"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
