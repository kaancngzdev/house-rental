import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />

      <main
        style={{
          minHeight: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </main>

      <Footer style={{ position: "absolute", bottom: 0, width: "100%" }} />
    </div>
  );
}
