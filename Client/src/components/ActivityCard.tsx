import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IActivity } from "../utils/";
import { useAuth } from "../hooks";

interface ActivityCardProps {
  activity: IActivity;
}

export function ActivityCard({ activity }: ActivityCardProps): ReactElement {
  const { userData } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/activities/${activity.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/activities/${activity.id}/edit`);
  };

  return (
    <div
      className="card bg-light mb-3"
      style={{
        maxWidth: "20rem",
        marginRight: "2rem",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>{activity.name}</span>
        {/* userData?.UserRole === "teacher" && (
          <button
            onClick={handleEditClick}
            className="btn btn-sm btn-outline-secondary"
          >
            <FaEdit /> Redigera
          </button>
        )*/}
      </div>
      <div className="card-body">
        <p className="card-text p-2">{activity.description}</p>
        <p className="card-text">
          <small className="text-muted">
            Typ: {activity.activityTypeName}
          </small>
        </p>
        <p className="card-text">
          <small className="text-muted">
            Datum: {new Date(activity.startTime).toLocaleDateString()}
          </small>
        </p>
      </div>
    </div>
  );
}