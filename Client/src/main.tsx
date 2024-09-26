import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./context/authProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import { NavbarProvider } from "./context/navbarProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <NavbarProvider>
        <RouterProvider router={router} />
      </NavbarProvider>
    </AuthProvider>
  </React.StrictMode>
);
