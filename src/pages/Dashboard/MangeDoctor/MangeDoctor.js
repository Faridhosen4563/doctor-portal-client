import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const MangeDoctor = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const closeModal = () => {
    setDeletingDoctor(null);
  };

  const { data: doctors = [], refetch } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/doctors`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const handleDeleteDoctor = (doctor) => {
    fetch(`${process.env.REACT_APP_API_URL}/doctors/${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`${doctor.name} deleted successfully`);
          refetch();
        }
      });
  };

  //   const handleDelete = (doctor) => {
  //     const agree = window.confirm(
  //       `are you sure you want to delete ${doctor.name}`
  //     );
  //     if (agree) {
  //       fetch(`${process.env.REACT_APP_API_URL}/doctors/${doctor._id}`, {
  //         method: "DELETE",
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
  //         },
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           if (data.deletedCount > 0) {
  //             toast.success(`${doctor.name} deleted successfully`);
  //             refetch();
  //           }
  //         });
  //     }
  //   };

  return (
    <div className="my-8">
      <h2 className="text-3xl font-semibold mb-4">
        Mange Doctor : {doctors.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, i) => (
              <tr className="hover" key={doctor._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img src={doctor.img} alt={doctor.name} />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>{doctor.email}</td>
                <td>
                  <label
                    onClick={() => setDeletingDoctor(doctor)}
                    htmlFor="confirm-modal"
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </label>
                  {/* <button
                    onClick={() => handleDelete(doctor)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConfirmationModal
          title={"Are you sure you want to delete?"}
          message={"if you delete this , never back this is."}
          closeModal={closeModal}
          deletingDoctor={deletingDoctor}
          handleDeleteDoctor={handleDeleteDoctor}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default MangeDoctor;
