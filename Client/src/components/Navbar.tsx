import { ReactElement } from "react";
import { Link } from "react-router-dom";
import "../css/SideNavbar.css";
import { BsJournalBookmark } from "react-icons/bs";

export function Navbar(): ReactElement {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 py-3 d-flex justify-content-between">
      <div className="d-flex">
        <BsJournalBookmark size={50} style={{ marginRight: "1rem" }} />
        <div>
          <h5>Kursvy - Programering 1</h5>
          <h6 className="opacity-50">DD1337 - 7.0 hp lärare: Jonas Johanson</h6>
        </div>
      </div>
      <div>
        <h5>
          Inloggad{" "}
          <span className="bg-primary p-1 text-light rounded">Elev</span>
        </h5>
        <h6 className="opacity-50">Carl Gustav</h6>
      </div>
    </nav>
  );
}
