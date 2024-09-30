import { ReactElement, useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
//import { useAuth, useCourseDetails } from '../hooks';
import { useActivities, useModules } from '../hooks';
//import { ArtifactList, ParticipantList } from '../components';
import { ActivityCard } from '../components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../css/CourseDetailsPage.css';

// Mock data tas bort senare och ersätts med data från servern.
const mockCourse = {
  id: 1,
  name: 'Programmering 1',
  description: 'Grundläggande programmeringskurs i Java',
};

const mockArtifacts = [
  { id: 1, name: 'Föreläsning 1', uploadDate: '2023-05-01' },
  { id: 2, name: 'Övningsuppgifter', uploadDate: '2023-05-05' },
  { id: 3, name: 'Projektbeskrivning', uploadDate: '2023-05-10' },
];

const mockParticipants = [
  { id: 1, name: 'Anna Andersson', course: 'Programmering 1' },
  { id: 2, name: 'Björn Bergström', course: 'Programmering 1' },
  { id: 3, name: 'Cecilia Carlsson', course: 'Programmering 1' },
];

export function CourseDetailsPage(): ReactElement {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const {
    modules,
    loading: modulesLoading,
    error: modulesError,
  } = useModules(courseId);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const {
    activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useActivities(selectedModuleId || '');

  useEffect(() => {
    if (modules && modules.length > 0 && !selectedModuleId) {
      setSelectedModuleId(modules[0].id);
    }
  }, [modules, selectedModuleId]);

  return (
    <div className="course-detail-container">
      <h1>{mockCourse.name}</h1>
      <p>{mockCourse.description}</p>

      <section className="modules-section">
        <h2>Modules</h2>
        <Link
          to={`/courses/${courseId}/addModule`}
          className="btn btn-primary mb-3"
        >
          Lägg till modul
        </Link>
        {modulesLoading && <p>Loading modules...</p>}
        {modulesError && <p>Error: {modulesError}</p>}
        <select
          value={selectedModuleId || ''}
          onChange={(e) => setSelectedModuleId(e.target.value)}
        >
          <option value="">Select a module</option>
          {modules.map((module) => (
            <option key={module.id} value={module.id}>
              {module.moduleName}
            </option>
          ))}
        </select>
      </section>

      <section className="activities-section">
        <h2>Activities</h2>
        {activitiesLoading && <p>Loading activities...</p>}
        {activitiesError && <p>Error: {activitiesError}</p>}
        {!activitiesLoading && !activitiesError && activities.length === 0 && (
          <p>No activities found for this module.</p>
        )}
        <div className="activities-grid">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <section className="materials-section">
        <h2>Kursmaterial</h2>
        <ul className="materials-list">
          {mockArtifacts.map((artifact) => (
            <li key={artifact.id} className="material-item">
              <span>{artifact.name}</span>
              <span>{artifact.uploadDate}</span>
              <div className="material-actions">
                <Link
                  to={`/materials/${artifact.id}/edit`}
                  className="edit-link"
                >
                  <FaEdit /> Redigera
                </Link>
                <button className="delete-button">
                  <FaTrash /> Ta bort
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="participants-section">
        <h2>Deltagare</h2>
        <ul className="participants-list">
          {mockParticipants.map((participant) => (
            <li key={participant.id} className="participant-item">
              <span>{participant.name}</span>
              <span>{participant.course}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="action-buttons">
        <Link
          to={`/courses/${courseId}/addActivity`}
          className="btn btn-primary"
        >
          Lägg till aktivitet
        </Link>
        <Link
          to={`/courses/${courseId}/addMaterial`}
          className="btn btn-secondary"
        >
          Lägg till kursmaterial
        </Link>
      </div>
    </div>
  );
}
