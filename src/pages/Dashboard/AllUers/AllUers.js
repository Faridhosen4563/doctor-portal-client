import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllUers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users`);
      const data = await res.json();
      return data;
    },
  });
  const handleAdmin = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
        }
      });
  };
  return (
    <div className="p-10">
      <h1 className="text-2xl mb-8">All Users</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.role !== "admin" && (
                    <button
                      onClick={() => handleAdmin(user._id)}
                      className="btn btn-xs bg-gradient-to-r from-primary to-secondary text-white"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUers;
