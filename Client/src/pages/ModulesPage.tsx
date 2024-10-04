import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useActivities } from "../hooks/useActivities";
import { useArtifacts, useAuth } from "../hooks";
// import { useActivities, useSubmissions, useModules} from "../hooks";
import { ActivityCard, SubmissionForm, SubmissionList } from "../components";
import axios from "axios";
import { BASE_URL, IActivity, IArtifact, IModule } from "../utils";
import { ActivitiesAddPage } from "./ActivitiesAddPage";
import { Button } from "react-bootstrap";

export function ModulesPage(): ReactElement {
  const navigate = useNavigate();
  const { moduleId } = useParams<{ moduleId: string }>();
  const { activities, setActivities, loading, error } = useActivities(moduleId);
  const { userData } = useAuth();
  const [moduleData, setModuleData] = useState<IModule | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleShow = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

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

  const handleUpdateActivitie = (newActivityData: IActivity) => {
    setActivities([newActivityData, ...activities]);
  };

  const getModuleData = async () => {
    const res = await axios.get(`${BASE_URL}/modules/${moduleId}`);
    setModuleData(res.data);

    console.log(res.data);
  };

  useEffect(() => {
    getModuleData();
  }, []);

  return (
    <div className="course-detail-container">
      {showPopup && (
        <ActivitiesAddPage
          edit={false}
          handleClose={handleClose}
          show={showPopup}
          moduleId={moduleId}
          handleUpdateActivities={handleUpdateActivitie}
        />
      )}
      <h1>{moduleData?.moduleName}</h1>
      <p>{moduleData?.description}</p>
      <section className="activities-section mb-5">
        <h2>Aktiviteter</h2>
        <div className="mb-3">
          {userData?.UserRole === "teacher" && (
            <Button variant="primary" className="w-25" onClick={handleShow}>
              Lägg till aktivitet
            </Button>
          )}
        </div>
        <div className="mt-4 d-flex flex-wrap">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>
      {/* <section className="submissions-section">
        <SubmissionList
          submissions={moduleData?.artifacts}
          onDownload={downloadFile}
        />
      </section> */}
    </div>
  );
}
