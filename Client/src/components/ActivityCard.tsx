import { ReactElement } from 'react';
import { IActivity } from '../utils/';

interface ActivityCardProps {
  activity: IActivity;
}

export function ActivityCard({ activity }: ActivityCardProps): ReactElement {
  return (
    <div className="activity-card">
      <h3> {activity.name} </h3>
      <p>Due date: {new Date(activity.endTime).toLocaleDateString()} </p>
      <p> {activity.description} </p>
    </div>
  );
}
