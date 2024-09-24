import { ReactElement, useState, useEffect } from 'react';
import { useCourses } from "../hooks/";
import { ICourse } from '../utils/interfaces';
import '../css/CourseList.css'; // denna definieras senare

export function CourseList(): ReactElement {
  const { courses, loading, error } = useCourses();

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error} </div>;

  return (
    <div className="course-list">
      <h2>Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul>
          {courses.map((course: ICourse) => (
            <li key={course.id} className="course-item">
              <h3> {course.courseName} </h3>
              <p> {course.description} </p>
              <p>
                Start date: {new Date(course.startDate).toLocaleDateString()}{' '}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
