import { ReactElement } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
//import { useAuth, useCourseDetails } from '../hooks';
import { useActivities } from "../hooks/useActivities";
//import { ArtifactList, ParticipantList } from '../components';
import { ActivityCard } from "../components";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../css/CourseDetailsPage.css";

// Mock data tas bort senare och ersätts med data från servern.
const mockCourse = {
  id: 1,
  name: "Programmering 1",
  description: "Grundläggande programmeringskurs i Java",
};

// const mockActivities = [
//   { id: 1, name: "Inlämning 1", dueDate: "2023-06-15", description: "Grundläggande syntax" },
//   { id: 2, name: "Grupprojekt", dueDate: "2023-06-30", description: "Skapa en enkel applikation" },
//   { id: 3, name: "Tentamen", dueDate: "2023-07-15", description: "Skriftlig tentamen" },
// ];

const mockArtifacts = [
  { id: 1, name: "Föreläsning 1", uploadDate: "2023-05-01" },
  { id: 2, name: "Övningsuppgifter", uploadDate: "2023-05-05" },
  { id: 3, name: "Projektbeskrivning", uploadDate: "2023-05-10" },
];

const mockParticipants = [
  { id: 1, name: "Anna Andersson", course: "Programmering 1" },
  { id: 2, name: "Björn Bergström", course: "Programmering 1" },
  { id: 3, name: "Cecilia Carlsson", course: "Programmering 1" },
];

export function CourseDetailsPage(): ReactElement {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const { activities, loading, error } = useActivities(courseId || "");

  return (
    <div className="course-detail-container">
      <h1>{mockCourse.name}</h1>
      <p>{mockCourse.description}</p>

      <section className="activities-section">
        <h2>Aktiviteter</h2>
        {loading && <p>Loading activities ... </p>}
        {error && <p>Error: {error} </p>}
        <div className="activities-grid">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <section className="materials-section">
        <h2>Kursmaterial</h2>
        <div className="mb-3">
          <Link
            to={`/addDocument/${courseId}?documentType=course`}
            className="btn btn-primary"
          >
            Lägg till Kursmaterial
          </Link>
        </div>
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
