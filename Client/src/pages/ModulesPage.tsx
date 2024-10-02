import { ReactElement } from "react";
import { useParams, Link } from "react-router-dom";
import { useActivities, useSubmissions, useModules} from "../hooks";
import { ActivityCard, SubmissionForm, SubmissionList } from "../components";
import axios from "axios";
import { BASE_URL } from "../utils";

export function ModulesPage(): ReactElement {  
  const { moduleId, courseId } = useParams<{ moduleId: string; courseId: string; }>();
  const { modules, loading: modulesLoading, error: modulesError } = useModules(courseId);
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities(moduleId);
  const { submissions, loading: submissionsLoading, error: submissionsError, addSubmission } = useSubmissions(moduleId ?? '');

  const currentModule = modules.find(module=> module.id === moduleId );

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

  const handleSubmit = (file: File, description: string) => {
    addSubmission(file, description);
  };

  if (modulesLoading) {
    return <div>Laddar moduldata...</div>
  }

  if (modulesError) {
    return <div>Modulen hittades inte.</div>
  }

  return (
    <div className="course-detail-container">
      <h1>{currentModule?.moduleName}</h1>
      <p>{currentModule?.description}</p>
      <p>Startdatum: {new Date(currentModule.startDate).toLocaleDateString()}</p>
      <p>Slutdatum: {new Date(currentModule.endDate).toLocaleDateString()}</p>
      
      <section className="activities-section">
        <h2>Aktiviteter</h2>
        <div className="mb-3">
          <Link
            to={`/courses/${courseId}/modules/${moduleId}/addActivity`}
            className="btn btn-primary"
          >
            Lägg till aktivitet
          </Link>
        </div>
        {activitiesLoading && <p>Laddar aktiviteter ... </p>}
        {activitiesError && <p>Fel: {activitiesError} </p>}
        <div className="activities-grid">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <section className="submissions-section">
        <h2>Inlämningsuppgifter</h2>
        {submissionsLoading && <p>Laddar inlämningsuppgifter ... </p>}
        {submissionsError && <p>Fel: {submissionsError} </p>}
        <SubmissionList submissions={submissions} onDownload={downloadFile} />
        <SubmissionForm onSubmit={handleSubmit} />
      </section>

      
    </div>
  );
}
