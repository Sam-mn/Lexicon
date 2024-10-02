import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { LoginStatusChip } from "./LoginStatusChip";
import "../css/SideNavbar.css";
import logo from "../assets/images/logo-lexicon.gif";
import { BsJournalBookmark } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { FiActivity, FiSettings, FiHome } from "react-icons/fi";
import { useNavbar } from "../hooks/useNavbar";
import { useAuth } from "../hooks";

export function SideNavbar(): ReactElement {
  const { setNavBarName, setIsCourse } = useNavbar();
  const { userData } = useAuth();
  const handleNavbar = (name: string) => {
    setNavBarName(name);
    setIsCourse(false);
  };
  return (
    <nav className="SideNavbar">
      <img src={logo} className="w-100" />
      <ul className="SideNavbar-nav mt-5">
        {userData?.UserRole === "teacher" && (
          <>
            <li className="SideNavbar-item">
              <Link
                to="/"
                className="SideNavbar-link"
                onClick={() => handleNavbar("Hem")}
              >
                <FiHome style={{ marginRight: "0.5rem" }} />
                Hem
              </Link>
            </li>
            <li className="SideNavbar-item">
              <Link
                to="/courses"
                className="SideNavbar-link"
                onClick={() => handleNavbar("Kurser")}
              >
                <BsJournalBookmark style={{ marginRight: "0.5rem" }} />
                Kurser
              </Link>
            </li>
            <li className="SideNavbar-item">
              <Link
                to="/courses"
                className="SideNavbar-link"
                onClick={() => handleNavbar("Inlämning / Betyg")}
              >
                <GoPencil style={{ marginRight: "0.5rem" }} />
                Inlämning / Betyg
              </Link>
            </li>
          </>
        )}
        {userData?.UserRole === "student" && (
          <li className="SideNavbar-item">
            <Link
              to={`/courses/${userData.courseId}`}
              className="SideNavbar-link"
              onClick={() => handleNavbar("Inlämning / Betyg")}
            >
              <BsJournalBookmark style={{ marginRight: "0.5rem" }} /> Min kurs
            </Link>
          </li>
        )}
        {/* <li className="SideNavbar-item">
          <Link to="/activities" className="SideNavbar-link" onClick={()=>handleNavbar("Aktiviteter")}>
            <FiActivity style={{ marginRight: "0.5rem" }} />
            Aktiviteter
          </Link>
        </li> */}
        {/* <li className="SideNavbar-item">
          <Link
            to="/modules"
            className="SideNavbar-link"
            onClick={() => handleNavbar("Inställningar")}
          >
            <FiSettings style={{ marginRight: "0.5rem" }} />
            Inställningar
          </Link>
        </li> */}
      </ul>
      <LoginStatusChip />
    </nav>
  );
}
