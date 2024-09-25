import { ReactElement } from 'react';
import { useArtifacts } from '../hooks/';

interface ArtifactListProps {
  courseId: number;
}

export function ArtifactList({ courseId }: ArtifactListProps): ReactElement {
  const { artifacts, loading, error } = useArtifacts(courseId);

  if (loading) return <div>Loading artifacts ... </div>;
  if (error) return <div>Error: {error} </div>;

  return (
    <ul className="artifact-list">
      {artifacts.map((artifact) => (
        <li key={artifact.id}>
          <span> {artifact.fileName} </span>
          <span> {new Date(artifact.uploadTime).toLocaleDateString()} </span>
        </li>
      ))}
    </ul>
  );
}
