import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loading from "../../Sheared/Loading";
import CheckOut from "./CheckOut";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const booking = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <Loading />;
  }
  return (
    <div className="my-8 p-10">
      <h1 className="text-3xl">Please Payment for {booking.treatment}</h1>
      <p className="text-xl my-4">
        Please pay <strong>${booking.price}</strong> for your appointment on{" "}
        {booking.appointmentDate} at {booking.slot}
      </p>

      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckOut booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
