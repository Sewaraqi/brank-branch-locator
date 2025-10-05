import React from 'react'
import Header from "../components/Header";
import Footer from "./Footer.js";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div >
      <Header />
      <main style={{ minHeight: "100vh"}}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
