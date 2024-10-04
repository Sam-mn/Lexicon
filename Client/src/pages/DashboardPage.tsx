import { ReactElement } from 'react';
import '../css/DashboardPage.css';
import { useNavigate, Link } from 'react-router-dom';
import { useCourses, useNavbar, useWeeklyActivities, useAuth} from '../hooks';
import { ActivityCard } from '../components';

export function DashboardPage(): ReactElement {
  const navigate = useNavigate();
  const { courses, error: coursesError, loading: coursesLoading } = useCourses();
  const { setNavBarName, setIsCourse, setCourseCode, setCredits } = useNavbar();
  const { activities, error: activitiesError, loading: activitiesLoading } = useWeeklyActivities();
  const { userData } = useAuth();

  return (
    <div className="dashboard-container p-3">
      <h1>Välkommen {userData?.name}</h1>
      <hr />      
      <section className="activities-section mb-5">
        <h2>Den här veckans aktiviteter:</h2>
        {activitiesLoading && <p>Laddar aktiviteter...</p>}
        {activitiesError && <p>Fel vid hämtning av aktiviteter: {activitiesError}</p>}
        {activities.length === 0 && <p>Det finns inga aktiviteter planerade för denna vecka.</p>}
        <div className="mt-4 d-flex flex-wrap">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <section className="courses-section">
        <h2>Kurser</h2>
        <Link to="/addCourse" className="linkToNewCourse">
          Lägg till en ny kurs
        </Link>
        {coursesLoading && <p>Laddar kurser...</p>}
        {coursesError && <p>Fel vid hämtning av kurser: {coursesError}</p>}
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
