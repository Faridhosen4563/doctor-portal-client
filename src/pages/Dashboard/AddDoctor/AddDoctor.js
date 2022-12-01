import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const imgKey = process.env.REACT_APP_imgbb_key;
  const navigate = useNavigate();

  const { data: options = [] } = useQuery({
    queryKey: ["options"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/appointmentSpecialty`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleAdd = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            img: imgData.data.url,
          };
          fetch(`${process.env.REACT_APP_API_URL}/doctors`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.acknowledged) {
                toast.success(`Doctor ${data.name} added successfully`);
                navigate("/dashboard/mangedoctor");
              }
            });
        }
      });
  };

  return (
    <div className="w-96 p-7">
      <h2 className="text-center text-3xl text-secondary">Add a doctor</h2>
      <form onSubmit={handleSubmit(handleAdd)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="input input-bordered w-full "
          />
          {errors.name && (
            <p className="alert alert-error my-2">{errors.name?.message}</p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", { required: "Email Address is required" })}
            type="email"
            className="input input-bordered w-full "
          />
          {errors.email && (
            <p className="alert alert-error my-2">{errors.email?.message}</p>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Specialty</span>
          </label>
          <select
            {...register("specialty")}
            className="select select-bordered w-full max-w-xs"
          >
            {options.map((option) => (
              <option key={option._id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            {...register("img", { required: "Photo is required" })}
            className="file-input w-full max-w-xs"
          />
          {errors.img && (
            <p className="alert alert-error my-2">{errors.img?.message}</p>
          )}
        </div>
        <input
          type="submit"
          value="Add Doctor"
          className="btn btn-accent w-full my-4"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
