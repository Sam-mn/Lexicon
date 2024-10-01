import { useState, useEffect } from 'react';
import { getCourseParticipants } from '../utils/';
import { IUser } from '../utils/';

interface ParticipantsHookResult {
  participants: IUser[];
  loading: boolean;
  error: string | null;
}

export function useParticipants(courseId: string): ParticipantsHookResult {
    const [participants, setParticipants] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function fetchParticipants() {
        try {
          const data = await getCourseParticipants(courseId);
          setParticipants(data);
          setLoading(false);
        } catch (err) {
          setError('An error occurred while fetching participants.');
          setLoading(false);
        }
      }
  
      fetchParticipants();
    }, [courseId]);
  
    return { participants, loading, error };
  }