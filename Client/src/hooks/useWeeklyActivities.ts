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
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        endOfWeek.setHours(23, 59, 59, 999);

        const filteredActivities = allActivities.filter(activity => {
          const activityEndTime = new Date(activity.endTime);
          return activityEndTime >= startOfWeek && activityEndTime <= endOfWeek;
        });

        setActivities(filteredActivities);
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