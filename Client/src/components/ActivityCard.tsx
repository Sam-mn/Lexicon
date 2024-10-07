import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IActivity } from "../utils/";
import { useAuth } from "../hooks";
import "../css/ActivityCard.css";

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isDeadlineToday = () => {
    const today = new Date();
    const deadline = new Date(activity.endTime);
    return (
      today.getDate() === deadline.getDate() &&
      today.getMonth() === deadline.getMonth() &&
      today.getFullYear() === deadline.getFullYear()
    );
  };

  return (
    <div className="activity-card mb-2" onClick={handleClick}>
      <div className="activity-card-header">
        <span>{activity.name}</span>
      </div>
      <div className="activity-card-body">
        <p className="activity-card-text">
          <small>
            Typ: <b>{activity.activityTypeName}</b>
          </small>
        </p>
        <p className="activity-card-text activity-card-date">
          Start: {formatDate(activity.startTime)}
        </p>
        <p
          className={`activity-card-text activity-card-date activity-card-deadline ${
            isDeadlineToday() ? "activity-card-deadline-today" : ""
          }`}
        >
          Inlämning: {formatDate(activity.endTime)}
        </p>
      </div>
    </div>
  );
}
