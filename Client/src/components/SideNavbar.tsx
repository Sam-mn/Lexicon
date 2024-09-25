import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { LoginStatusChip } from "./LoginStatusChip";
import "../css/SideNavbar.css";
import logo from "../assets/images/logo-lexicon.gif";
import { BsJournalBookmark } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { FiActivity, FiSettings } from "react-icons/fi";

export function SideNavbar(): ReactElement {
  return (
    <nav className="SideNavbar">
      <Link to="/">
        <img src={logo} className="w-100" />
      </Link>
      <ul className="SideNavbar-nav mt-5">
        <li className="SideNavbar-item">
          <Link to="/courses" className="SideNavbar-link">
            <BsJournalBookmark style={{ marginRight: "0.5rem" }} />
            Kurser
          </Link>
        </li>
        <li className="SideNavbar-item">
          <Link to="/courses" className="SideNavbar-link">
            <GoPencil style={{ marginRight: "0.5rem" }} />
            Inlämning / Betyg
          </Link>
        </li>
        <li className="SideNavbar-item">
          <Link to="/activities" className="SideNavbar-link">
            <FiActivity style={{ marginRight: "0.5rem" }} />
            Aktiviteter
          </Link>
        </li>
        <li className="SideNavbar-item">
          <Link to="/modules" className="SideNavbar-link">
            <FiSettings style={{ marginRight: "0.5rem" }} />
            Inställningar
          </Link>
        </li>
      </ul>
      <LoginStatusChip />
    </nav>
  );
}
