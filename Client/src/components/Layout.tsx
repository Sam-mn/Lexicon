import { ReactElement } from 'react';
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

export function Layout(): ReactElement {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}