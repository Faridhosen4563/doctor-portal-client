import { async } from "@firebase/util";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckOut = ({ booking }) => {
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { price, patient, email, _id } = booking;
  console.log(booking);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [booking]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
    }
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patient,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError);
      setProcessing(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        transactionId: paymentIntent.id,
        bookingId: _id,
        email,
      };
      fetch(`${process.env.REACT_APP_API_URL}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("Congrats!!! Your payment was successful");
            setTransactionId(paymentIntent.id);
            setProcessing(false);
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && <p className="text-red-300 mt-4">{cardError}</p>}
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="my-4 btn btn-sm btn-primary"
      >
        Pay
      </button>
      {success && (
        <>
          <p className="text-xl text-green-500">{success}</p>
          <p className="text-xl my-2">
            Transaction Id : <span className="font-bold">{transactionId}</span>
          </p>
        </>
      )}
    </form>
  );
};

export default CheckOut;
