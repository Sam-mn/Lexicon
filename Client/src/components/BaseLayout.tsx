import { ReactElement } from 'react';
import { Outlet } from "react-router-dom";
import { Footer } from "../components";

export function BaseLayout(): ReactElement {
  return (
    <div className="app-container">
      <Outlet />
      <Footer />
    </div>
  );
}