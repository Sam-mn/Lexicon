import { useState, useEffect } from 'react';
import { getCourseDetails, getCourseActivities } from '../utils/';
import { ICourse, IActivity } from '../utils/';

interface CourseDetailsHookResult {
  course: ICourse | null;
  activities: IActivity[];
  loading: boolean;
  error: string | null;
}

export function useCourseDetails(courseId: string): CourseDetailsHookResult {
  const [course, setCourse] = useState<ICourse | null>(null);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        console.log(courseId)
        const courseData = await getCourseDetails(courseId);
        const activitiesData = await getCourseActivities(courseId);
        setCourse(courseData);
        setActivities(activitiesData);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching course details.');
        setLoading(false);
      }
    }

    fetchCourseDetails();
  }, [courseId]);

  return { course, activities, loading, error };
}
