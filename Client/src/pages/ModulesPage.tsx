import { ReactElement, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useActivities } from "../hooks/useActivities";
import { ActivityCard } from "../components";
import { useArtifacts } from "../hooks";
import axios from "axios";
import { BASE_URL, IArtifact } from "../utils";

const mockModule = {
  id: 1,
  name: "module name",
  description: "module name desc",
};

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

export function ModulesPage(): ReactElement {
  const navigate = useNavigate();
  const { moduleId } = useParams<{ moduleId: string }>();
  const { activities, loading, error } = useActivities(moduleId);

  const downloadFile = async (documentId: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/Artifacts/${documentId}`);
      if (res.data.fileContent) {
        const byteCharacters = atob(res.data.fileContent);
        const byteNumbers = Array.from(byteCharacters, (char) =>
          char.charCodeAt(0)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {
          type: res.data.contentType,
        });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl);
        URL.revokeObjectURL(blobUrl);
      } else {
        console.error("File content not available");
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  return (
    <div className="course-detail-container">
      <h1>{mockModule.name}</h1>
      <p>{mockModule.description}</p>
      <section className="activities-section">
        <h2>Aktiviteter</h2>
        <div className="mb-3">
          <Link
            to={`/courses/${moduleId}/addActivity`}
            className="btn btn-primary"
          >
            Lägg till aktivitet
          </Link>
        </div>
        {loading && <p>Loading activities ... </p>}
        {error && <p>Error: {error} </p>}
        <div className="activities-grid">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>
    </div>
  );
}
