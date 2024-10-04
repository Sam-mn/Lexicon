import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, IActivity } from '../utils';

export const useWeeklyActivities = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeeklyActivities = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/activities`);
        const allActivities: IActivity[] = response.data;

        const now = new Date();
        now.setHours(0,0,0,0);
        
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() + (6-now.getDay()));
        endOfWeek.setHours(23,59,59,999);

        const filteredAndSortedActivities = allActivities.filter(activity => {
          const activityEndTime = new Date(activity.endTime);
          return activityEndTime >= now && activityEndTime <= endOfWeek;
        }).sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());

        setActivities(filteredAndSortedActivities);
        setLoading(false);
      } catch (err) {
        setError('Error fetching weekly activities');
        setLoading(false);
      }
    };

    fetchWeeklyActivities();
  }, []);

  return { activities, loading, error };
};