import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useActivities } from '../hooks/useActivities';
import { useArtifacts, useAuth } from '../hooks';
// import { useActivities, useSubmissions, useModules} from "../hooks";
import { ActivityCard, SubmissionForm, SubmissionList } from '../components';
import axios from 'axios';
import { BASE_URL, IArtifact, IModule } from '../utils';

export function ModulesPage(): ReactElement {
  const navigate = useNavigate();
  const { moduleId } = useParams<{ moduleId: string }>();
  const { activities, loading, error } = useActivities(moduleId);
  const { userData } = useAuth();
  const [moduleData, setModuleData] = useState<IModule | null>(null);

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
        console.error('File content not available');
      }
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  const getModuleData = async () => {
    const res = await axios.get(`${BASE_URL}/modules/${moduleId}`);
    setModuleData(res.data);

    console.log(res.data);
  };

  useEffect(() => {
    getModuleData();
  }, []);

  // const handleSubmit = (file: File, description: string) => {
  //   addSubmission(file, description);
  // };

  // if (modulesLoading) {
  //   return <div>Laddar moduldata...</div>;
  // }

  // if (modulesError) {
  //   return <div>Modulen hittades inte.</div>;
  // }

  return (
    <div className="course-detail-container">
      <h1>{moduleData?.moduleName}</h1>
      <p>{moduleData?.description}</p>
      <section className="activities-section mb-5">
        <h2>Aktiviteter</h2>
        <div className="mb-3">
          {userData?.UserRole === 'teacher' && (
            <Link
              to={`/courses/${moduleId}/addActivity`}
              className="btn btn-primary"
            >
              Lägg till aktivitet
            </Link>
          )}
        </div>
        {/* {activitiesLoading && <p>Laddar aktiviteter ... </p>}
        {activitiesError && <p>Fel: {activitiesError} </p>} */}
        <div className="mt-4 d-flex flex-wrap">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <section className="submissions-section">
        {/* {submissionsLoading && <p>Laddar inlämningsuppgifter ... </p>}
        {submissionsError && <p>Fel: {submissionsError} </p>}
        <SubmissionList submissions={submissions} onDownload={downloadFile} />
        <SubmissionForm onSubmit={handleSubmit} /> */}
        <SubmissionList
          submissions={moduleData?.artifacts}
          onDownload={downloadFile}
        />
      </section>
    </div>
  );
}
