import { useState, useEffect } from 'react';
import { ISubmission } from '../utils';
import { getModuleSubmissions, submitArtifact } from '../utils';

export const useSubmissions = (moduleId: string) => {
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, [moduleId]);

  const fetchSubmissions = async () => {
    try {
      const data = await getModuleSubmissions(moduleId);
      setSubmissions(data);
      setLoading(false);
    } catch (err) {
      setError('Ett fel uppstod vid hämtning av inlämningsuppgifter.');
      setLoading(false);
    }
  };

  const addSubmission = async (file: File, description: string) => {
    try {
      const newSubmission = await submitArtifact(moduleId, file, description);
      setSubmissions([...submissions, newSubmission]);
    } catch (err) {
      setError('Ett fel uppstod vid inlämning av uppgiften.');
    }
  };

  return { submissions, loading, error, addSubmission };
};
