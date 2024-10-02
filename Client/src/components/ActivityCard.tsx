import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IActivity } from "../utils/";
import { useAuth } from "../hooks";

interface ActivityCardProps {
  activity: IActivity;
}

export function ActivityCard({ activity }: ActivityCardProps): ReactElement {
  const { userData } = useAuth();

  return (
    <div className="activity-card" key={activity.id}>
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
          <Link to={`/activities/${activity.id}/edit`} className="edit-link">
            <FaEdit /> Redigera
          </Link>
        </div>
      )}
    </div>
  );
}
