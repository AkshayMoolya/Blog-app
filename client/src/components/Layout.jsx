import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <main className="p-2 max-w-3xl mx-auto my-0 ">
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
