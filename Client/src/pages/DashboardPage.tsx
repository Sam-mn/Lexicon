import { useNavigate, Link } from 'react-router-dom';
import { useCourses, useNavbar, useWeeklyActivities, useAuth } from '../hooks';
import { ActivityCard } from '../components';
import { ReactElement, useEffect, useState } from 'react';
import { AddEditCourse } from '../pages';
import { Button, ListGroup } from 'react-bootstrap';
import '../css/DashboardPage.css';
import { ICourse } from '../utils';

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
    setNavBarName('Hem');
  }, []);

  const handleUpdateCourses = (NewCourseData: ICourse) => {
    setCourses([NewCourseData, ...courses]);
  };

  const currentDate = new Date();
  const endOfWeek = new Date(currentDate);
  endOfWeek.setDate(currentDate.getDate() + (5 - currentDate.getDay()));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('sv-SE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
      <div className="mt-4">
        <h1>Välkommen {userData?.name}!</h1>
        <p className="text-muted">{formatDate(currentDate)} </p>
        <hr />
        <section className="activities-section mb-5">
          <h4>
            Aktiviteter du har fram till slutet av veckan (
            {formatDate(endOfWeek)}):
          </h4>
          {activitiesLoading && <p>Laddar aktiviteter...</p>}
          {activitiesError && (
            <p>Fel vid hämtning av aktiviteter: {activitiesError}</p>
          )}
          {activities.length === 0 && (
            <p>Det finns inga aktiviteter planerade för resten av veckan.</p>
          )}
          <div className="activities-grid">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>
      </div>

      <section className="courses-section">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Kurser</h4>
          <Button
            variant="primary"
            className="add-course-button"
            onClick={handleShow}
          >
            Lägg till en ny kurs
          </Button>
        </div>
        <ListGroup className="courses-list">
          {courses?.map((c) => (
            <ListGroup.Item
              key={c.id}
              action
              onClick={() => {
                navigate(`/courses/${c.id}`);
                setNavBarName(c.courseName);
                setCourseCode(c.courseCode);
                setCredits(c.credits);
                setIsCourse(true);
              }}
              className="course-item"
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{c.courseName}</h5>
                <small className="text-muted">Kurskod: {c.courseCode}</small>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </section>
    </div>
  );
}
