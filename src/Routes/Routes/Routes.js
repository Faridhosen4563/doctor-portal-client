import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../pages/Dashboard/AddDoctor/AddDoctor";
import AllUers from "../../pages/Dashboard/AllUers/AllUers";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import MangeDoctor from "../../pages/Dashboard/MangeDoctor/MangeDoctor";
import MyAppointment from "../../pages/Dashboard/MyAppointment/MyAppointment";
import Payment from "../../pages/Dashboard/Payment/Payment";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import DisplayError from "../../pages/Sheared/DisplayError/DisplayError";
import Signup from "../../pages/Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/appointment",
        element: (
          <PrivateRoute>
            <Appointment></Appointment>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <MyAppointment></MyAppointment>,
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUers></AllUers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/adddoctor",
        element: (
          <AdminRoute>
            <AddDoctor></AddDoctor>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/mangedoctor",
        element: (
          <AdminRoute>
            <MangeDoctor></MangeDoctor>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_API_URL}/bookings/${params.id}`),
      },
    ],
  },
]);
