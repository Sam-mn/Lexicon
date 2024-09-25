import { ReactElement } from 'react';
import { useParticipants } from '../hooks';

interface ParticipantListProps {
  courseId: number;
}

export function ParticipantList({
  courseId,
}: ParticipantListProps): ReactElement {
  const { participants, loading, error } = useParticipants(courseId);

  if (loading) return <div>Loading participants ... </div>;
  if (error) return <div>Error: {error} </div>;

  return (
    <ul className="participant-list">
      {participants.map((participant) => (
        <li key={participant.id}> {participant.name} </li>
      ))}
    </ul>
  );
}
