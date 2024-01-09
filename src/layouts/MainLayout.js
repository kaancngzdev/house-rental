import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
