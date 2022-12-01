import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider/AuthProvider";
import useAdmin from "../hooks/useAdmin/useAdmin";
import Headers from "../pages/Sheared/Headers";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div>
      <Headers></Headers>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            <li>
              <Link to="/dashboard">My Appointment</Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/allusers">All Users</Link>
                </li>
                <li>
                  <Link to="/dashboard/adddoctor">Add Doctor</Link>
                </li>
                <li>
                  <Link to="/dashboard/mangedoctor">Mange Doctor</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
