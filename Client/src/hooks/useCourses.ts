import { useState, useEffect } from "react";
import { getCoursesReq } from '../utils/'
import { ICourse } from "../utils/";

export function useCourses() {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const fetchedCourses = await getCoursesReq();
                setCourses(fetchedCourses);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch courses. Please try again.');
                setLoading(false);
            }
        }

        fetchCourses();
    }, []);

    return { courses, loading, error, setCourses };
}