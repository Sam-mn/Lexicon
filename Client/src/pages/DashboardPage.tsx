import { ReactElement, useEffect, useState } from "react";
import "../css/DashboardPage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth, useCourses } from "../hooks";
import { useNavbar } from "../hooks/useNavbar";
import { AddEditCourse } from "./AddEditCourse";
import { Button } from "react-bootstrap";

export function DashboardPage(): ReactElement {
  const navigate = useNavigate();
  const { courses, error, loading } = useCourses();
  const { setNavBarName, setIsCourse, setCourseCode, setCredits } = useNavbar();
  const [showPopup, setShowPopup] = useState(false);

  const handleShow = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  const { userData } = useAuth();
  useEffect(() => {
    setNavBarName("Hem");
  }, []);

  return (
    <div className="dashboard-container p-3">
      {showPopup && (
        <AddEditCourse
          handleClose={handleClose}
          show={showPopup}
          edit={false}
        />
      )}
      <h1>Välkommen {userData?.name}!</h1>
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
        {/* <Link to="/addCourse" className="linkToNewCourse">
          Lägg till en ny kurs
        </Link> */}
        <Button variant="primary" className="w-25" onClick={handleShow}>
          Lägg till en ny kurs
        </Button>
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
