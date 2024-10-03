import { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  }

  return (
    <div className="activity-card" key={activity.id} onClick={handleClick} style={{ cursor: 'pointer' }} >
      <div className="activity-header">
        <span>{activity.name}</span>
        <span>{new Date(activity.endTime).toLocaleDateString()}</span>
      </div>
      <div className="activity-body">
        <p>{activity.description}</p>
        <p>Type: {activity.activityTypeName}</p>
      </div>
      {userData?.UserRole === "teacher" && (
        <div className="activity-footer">
          <Link to={`/activities/${activity.id}/edit`} className="edit-link" onClick={(e) => e.stopPropagation()}>
            <FaEdit /> Redigera
          </Link>
        </div>
      )}
    </div>
  );
}
