import { ReactElement } from 'react';
import { useParticipants } from '../hooks';
import { Link } from 'react-router-dom';

interface ParticipantListProps {
  courseId: string;
}

export function ParticipantList({
  courseId,
}: ParticipantListProps): ReactElement {
  const { participants, loading, error } = useParticipants(courseId);

  return (
    <div>
      <div className="mb-3">
        <h2>Deltagare</h2>
        <Link
          to={`/courses/${courseId}/addParticipant`}
          className="btn btn-primary"
        >
          Lägg till Deltagare
        </Link>
      </div>
      {loading && <div>Loading participants ... </div>}
      {error && <div>Error: {error} </div>}
      {!loading && !error && (
        <ul className="participant-list list-group">
          {participants.map((participant) => (
            <li key={participant.id} className="list-group-item d-flex justify-content-between align-items-center">
              {participant.name}
              <span className="badge bg-primary rounded-pill">{participant.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
