import { ReactElement } from 'react';
import { Outlet } from "react-router-dom";
import { Footer } from "../components";
import '../css/BaseLayout.css'

export function BaseLayout(): ReactElement {
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}