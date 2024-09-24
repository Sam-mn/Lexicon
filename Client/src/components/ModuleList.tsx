import { ReactElement } from 'react';
import { useModules } from '../hooks';
import { IModule } from '../utils';
import '../css/ModuleList.css'; // denna definieras senare

interface ModuleListProps {
  courseId: number;
}

export function ModuleList({ courseId }: ModuleListProps): ReactElement {
  const { modules, loading, error } = useModules(courseId);

  if (loading) return <div>Loading modules ... </div>;
  if (error) return <div>Error: {error} </div>;

  return (
    <div className="module-list">
      <h3>Modules</h3>
      {modules.length === 0 ? (
        <p>There are no modules available for this course.</p>
      ) : (
        <ul>
          {modules.map((module: IModule) => (
            <li key={module.id} className="module-item">
              <h4>{module.moduleName}</h4>
              <p>{module.description}</p>
              <p>
                {' '}
                Start Date: {new Date(
                  module.startDate
                ).toLocaleDateString()}{' '}
              </p>
              <p> End Date: {new Date(module.endDate).toLocaleDateString()} </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
