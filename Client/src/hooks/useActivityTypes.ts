import { useState, useEffect } from "react";
import { getActivityTypesReq } from "../utils";
import { IActivityType } from "../utils";

export function useActivityTypes() {
    const [activityTypes, setActivityTypes] = useState<IActivityType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchActivityTypes() {
            try {
                const fetchedActivityTypes = await getActivityTypesReq();
                setActivityTypes(fetchedActivityTypes);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch activity types. Please try again.");
                setLoading(false);
            }
        }

        fetchActivityTypes();
    }, []);

    return { activityTypes, loading, error };
}