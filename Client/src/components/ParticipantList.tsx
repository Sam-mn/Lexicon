import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../utils";
import { useAuth } from "../hooks";
import { Button } from "react-bootstrap";
import { ParticipantsAddPage } from "../pages";

interface ParticipantListProps {
  courseUser: IUser[];
  courseId: string;
}

export function ParticipantList({
  courseUser,
  courseId,
}: ParticipantListProps): ReactElement {
  const { userData } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const handleShow = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  return (
    <div>
      {showPopup && (
        <ParticipantsAddPage
          edit={false}
          handleClose={handleClose}
          show={showPopup}
          courseId={courseId}
        />
      )}
      <div className="mb-3">
        <h2>Deltagare</h2>
        {userData?.UserRole === "teacher" && (
          <Button variant="primary" className="w-25" onClick={handleShow}>
            Lägg till Deltagare
          </Button>
          // <Link
          //   to={`/courses/${courseId}/addParticipant`}
          //   className="btn btn-primary"
          // >
          //   Lägg till Deltagare
          // </Link>
        )}
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
