import React from "react";
import quote from "../../../assets/icons/quote.svg";
import person1 from "../../../assets/images/people1.png";
import person2 from "../../../assets/images/people2.png";
import person3 from "../../../assets/images/people3.png";
import SingleReview from "./SingleReview";

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "Winson Herry",
      address: "California",
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: person1,
    },
    {
      id: 2,
      name: "Agnes Cora",
      address: "California",
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: person2,
    },
    {
      id: 3,
      name: "Ada Amelia",
      address: "California",
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: person3,
    },
  ];
  return (
    <section className="my-28">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-bold text-secondary">Testimonial</p>
          <h2 className="text-4xl">What Our Patients Says</h2>
        </div>
        <img src={quote} alt="" className="w-24 h-20 lg:w-48 lg:h-40" />
      </div>
      <div className="grid gap-14 mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <SingleReview key={review.id} review={review}></SingleReview>
        ))}
      </div>
    </section>
  );
};

export default Review;
