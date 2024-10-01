import { useState, useEffect } from "react";
import { getActivitiesReq } from "../utils";
import { IActivity } from "../utils";

export function useActivities(moduleId: string | undefined) {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchActivities() {
          if (!moduleId) {
            setError('Invalid course ID');
            setLoading(false);
            return;
          }
          if (!moduleId) {
            setActivities([]);
            setLoading(false);
            return;
          }
    
          try {
            const data = await getActivitiesReq(moduleId);
            setActivities(data);
            setLoading(false);
          } catch (err) {
            setError('Failed to fetch activities');
            setLoading(false);
          }
        }
    
        fetchActivities();
      }, [moduleId]);
    
      return { activities, loading, error };
    }