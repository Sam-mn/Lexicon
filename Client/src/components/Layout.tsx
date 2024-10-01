import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { SideNavbar, Navbar } from "../components";
import "../css/Layout.css";

export function Layout(): ReactElement {
  return (
    <div className="layout">
      <SideNavbar />
      <main className="main-content">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
