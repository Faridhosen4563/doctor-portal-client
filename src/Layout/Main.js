import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Sheared/Footer";

import Headers from "../pages/Sheared/Headers";

const Main = () => {
  return (
    <div>
      <Headers></Headers>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
