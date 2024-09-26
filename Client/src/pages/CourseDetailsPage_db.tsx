import { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth, useCourseDetails } from '../hooks';
import { ActivityCard, ArtifactList, ParticipantList } from '../components';

export function CourseDetailsPage(): ReactElement {
  const { courseId } = useParams();
  const { course, activities, loading, error } = useCourseDetails(courseId!);

  if (loading) return <div>Loading course details ... </div>;
  if (error) return <div>Error: {error} </div>;

  return (
    <div>
      <h1> {course?.courseName} </h1>
      <p> {course?.description} </p>

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


      <h2>Activities</h2>
      <div className="activity-list">
        {activities?.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      <h2>Course Materials</h2>

      <p>User Role</p>
    </div>
  );
}
