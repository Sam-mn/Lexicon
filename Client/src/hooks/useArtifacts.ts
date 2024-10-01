import { useState, useEffect } from 'react';
import { getCourseArtifacts } from '../utils/';
import { IArtifact } from '../utils/';

interface ArtifactsHookResult {
  artifacts: IArtifact[];
  loading: boolean;
  error: string | null;
}

export function useArtifacts(): ArtifactsHookResult {
  const [artifacts, setArtifacts] = useState<IArtifact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArtifacts() {
      try {
        const data = await getCourseArtifacts();
        setArtifacts(data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching artifacts.');
        setLoading(false);
      }
    }

    fetchArtifacts();
  }, []);

  return { artifacts, loading, error };
}
