import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../utils";

interface ParticipantListProps {
  courseUser: IUser[];
  courseId: string;
}

export function ParticipantList({
  courseUser,
  courseId,
}: ParticipantListProps): ReactElement {
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
      {
        <ul className="participant-list list-group">
          {courseUser.map((participant) => (
            <li
              key={participant.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {participant.name}
              <span className="badge bg-primary rounded-pill">
                {participant.UserRole}
              </span>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
