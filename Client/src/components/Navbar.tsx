import { ReactElement } from "react";
import "../css/SideNavbar.css";
import { useNavbar, useAuth } from "../hooks";
import IconComponent from "./IconComponent";


export function Navbar(): ReactElement {
  const { navBarName, isCourse, teacherName, credits, courseCode, NavbarIcon } =
    useNavbar();
  const { userData } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 py-3 d-flex justify-content-between">
      <div className="d-flex">
        <IconComponent />
        <div className="d-flex flex-column justify-content-center">
          <h5 className="align-self-start m-0">{navBarName}</h5>
          {isCourse && (
            <h6 className="opacity-50 mt-2">
              {courseCode} - {credits} hp
              {/* <br></br> Lärare: {teacherName} */}
            </h6>
          )}
        </div>
      </div>
      <div>
        <h5>
          Inloggad{" "}
          <span className="bg-primary p-1 text-light rounded">
            {userData?.UserRole === "student" ? "Elev" : "Lärare"}
          </span>
        </h5>
        <h6 className="opacity-50">{userData?.name}</h6>
      </div>
    </nav>
  );
}
