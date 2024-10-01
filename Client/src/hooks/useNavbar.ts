import { useContext } from "react";
import { NavbarContext } from "../context/navbarProvider";

export function useNavbar() {
  return useContext(NavbarContext);
}