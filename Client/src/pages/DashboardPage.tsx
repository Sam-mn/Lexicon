import { ReactElement } from "react";
import "../css/DashboardPage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCourses } from "../hooks";
import { useNavbar } from "../hooks/useNavbar";

export function DashboardPage(): ReactElement {
  const navigate = useNavigate();
  const { courses, error, loading } = useCourses();
  const { setNavBarName, setIsCourse, setCourseCode, setCredits } = useNavbar();

  return (
    <div className="dashboard-container p-3">
      <h1>Välkommen Carl!</h1>
      <div className="mt-4 d-flex flex-wrap">
        <div
          className="card bg-light mb-3"
          style={{ maxWidth: "20rem", marginRight: "2rem" }}
        >
          <div className="card-header d-flex justify-content-between">
            <span>Inlämning Programmering 1</span>
            <span>idag</span>
          </div>
          <div className="card-body">
            <p className="card-text p-2">
              Deadline för inlämning programmering 1. glöm inte att ladda upp
              era projectfiller.
            </p>
          </div>
        </div>
        <div
          className="card bg-light mb-3"
          style={{ maxWidth: "20rem", marginRight: "2rem" }}
        >
          <div className="card-header d-flex justify-content-between">
            <span>Inlämning Programmering 1</span>
            <span>idag</span>
          </div>
          <div className="card-body">
            <p className="card-text p-2">
              Deadline för inlämning programmering 1. glöm inte att ladda upp
              era projectfiller.
            </p>
          </div>
        </div>
        <div
          className="card bg-light mb-3"
          style={{ maxWidth: "20rem", marginRight: "2rem" }}
        >
          <div className="card-header d-flex justify-content-between">
            <span>Inlämning Programmering 1</span>
            <span>idag</span>
          </div>
          <div className="card-body">
            <p className="card-text p-2">
              Deadline för inlämning programmering 1. glöm inte att ladda upp
              era projectfiller.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 ">
        <h1>Kurser</h1>
        <Link to="/addCourse" className="linkToNewCourse">
          Lägg till en ny kurs
        </Link>
        {courses?.map((c) => (
          <div
            key={c.id}
            className="dashBoardCourseList"
            onClick={() => {
              navigate(`/courses/${c.id}`);
              setNavBarName(c.courseName);
              setCourseCode(c.courseCode);
              setCredits(c.credits);
              setIsCourse(true);
            }}
          >
            <h4>{c.courseName}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
