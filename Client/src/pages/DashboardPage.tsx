import "../css/DashboardPage.css";
import { useNavigate, Link } from "react-router-dom";
import { useCourses, useNavbar, useWeeklyActivities, useAuth } from "../hooks";
import { ActivityCard } from "../components";
import { ReactElement, useEffect, useState } from "react";
import "../css/DashboardPage.css";
import { AddEditCourse } from "./AddEditCourse";
import { Button } from "react-bootstrap";
import { ICourse } from "../utils";

export function DashboardPage(): ReactElement {
  const navigate = useNavigate();
  const {
    courses,
    error: coursesError,
    loading: coursesLoading,
    setCourses,
  } = useCourses();
  const { setNavBarName, setIsCourse, setCourseCode, setCredits } = useNavbar();
  const [showPopup, setShowPopup] = useState(false);
  const {
    activities,
    error: activitiesError,
    loading: activitiesLoading,
  } = useWeeklyActivities();
  const { userData } = useAuth();

  const handleShow = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);
  useEffect(() => {
    setNavBarName("Hem");
  }, []);

  const handleUpdateCourses = (NewCourseData: ICourse) => {
    setCourses([NewCourseData, ...courses]);
  };

  return (
    <div className="dashboard-container p-3">
      {showPopup && (
        <AddEditCourse
          handleClose={handleClose}
          show={showPopup}
          edit={false}
          handleUpdateCourses={handleUpdateCourses}
        />
      )}
      <div className="mt-4 ">
        <h1>Välkommen {userData?.name}</h1>
        <hr />
        <section className="activities-section mb-5">
          <h2>Den här veckans aktiviteter:</h2>
          {activitiesLoading && <p>Laddar aktiviteter...</p>}
          {activitiesError && (
            <p>Fel vid hämtning av aktiviteter: {activitiesError}</p>
          )}
          {activities.length === 0 && (
            <p>Det finns inga aktiviteter planerade för denna vecka.</p>
          )}
          <div className="mt-4 d-flex flex-wrap">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>
      </div>
      <section className="courses-section">
        <h1>Kurser</h1>
        <Button variant="primary" className="w-25" onClick={handleShow}>
          {" "}
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
      </section>
    </div>
  );
}
