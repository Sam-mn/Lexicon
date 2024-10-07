import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { LoginStatusChip } from "../components";
import { BsJournalBookmark, BsHouseDoor } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { useNavbar, useAuth } from "../hooks";
import "../css/SideNavbar.css";

export function SideNavbar(): ReactElement {
  const { setNavBarName, setIsCourse } = useNavbar();
  const { userData } = useAuth();
  const location = useLocation();

  const handleNavbar = (name: string) => {
    setNavBarName(name);
    setIsCourse(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="SideNavbar">
      <div className="SideNavbar-header">
        <span className="SideNavbar-title">LMS</span>
      </div>      
      <ul className="SideNavbar-nav">
        {userData?.UserRole === "teacher" && (
          <>
            <li className="SideNavbar-item">
              <Link
                to="/"
                className={`SideNavbar-link ${isActive("/") ? "active" : ""}`}
                onClick={() => handleNavbar("Hem")}
              >
                <BsHouseDoor className="SideNavbar-icon" />
                <span>Hem</span>
              </Link>
            </li>
            <li className="SideNavbar-item">
              <Link
                to="/courses"
                className={`SideNavbar-link ${isActive("/courses") ? "active" : ""}`}
                onClick={() => handleNavbar("Kurser")}
              >
                <BsJournalBookmark className="SideNavbar-icon" />
                <span>Kurser</span>
              </Link>
            </li>
            <li className="SideNavbar-item">
              <Link
                to="/assignment"
                className={`SideNavbar-link ${isActive("/assignment") ? "active" : ""}`}
                onClick={() => handleNavbar("Inlämning / Betyg")}
              >
                <GoPencil className="SideNavbar-icon" />
                <span>Inlämning / Betyg</span>
              </Link>
            </li>
          </>
        )}
        {userData?.UserRole === "student" && (
          <li className="SideNavbar-item">
            <Link
              to={`/courses/${userData.courseId}`}
              className={`SideNavbar-link ${isActive(`/courses/${userData.courseId}`) ? "active" : ""}`}
            >
              <BsJournalBookmark className="SideNavbar-icon" />
              <span>Min kurs</span>
            </Link>
          </li>
        )}
      </ul>
      <LoginStatusChip />
    </nav>
  );
}