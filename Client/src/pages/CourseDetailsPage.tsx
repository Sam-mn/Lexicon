import { ReactElement, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  useArtifacts,
  useAuth,
  useCourseDetails,
  useModules,
  useNavbar,
} from "../hooks";
import "../css/CourseDetailsPage.css";
import axios from "axios";
import { BASE_URL, IModule } from "../utils";
import { ParticipantList } from "../components";
import { ModulesAddPage, DocumentAddPage } from "../pages";
import { Button } from "react-bootstrap";


export function CourseDetailsPage(): ReactElement {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const {
    modules,
    loading: modulesLoading,
    error: modulesError,
    setModules,
  } = useModules(courseId);
  const { userData } = useAuth();
  const [selectedModuleId, setSelectedModuleId] = useState<string>();
  const {
    course,
    loading: courseLoading,
    error: courseError,
  } = useCourseDetails(courseId);
  const [showModulesPopup, setShowModulesPopup] = useState(false);
  const handleShowModulesPopup = () => setShowModulesPopup(true);
  const handleCloseModulesPopup = () => setShowModulesPopup(false);

  const [showDocPopup, setShowDocPopup] = useState(false);
  const handleShowDocPopup = () => setShowDocPopup(true);
  const handleCloseDocPopup = () => setShowDocPopup(false);

  useEffect(() => {
    if (modules && modules.length > 0 && !selectedModuleId) {
      setSelectedModuleId(modules[0].id);
    }
    if (course) setNavBarName(course?.courseName);
  }, [modules, selectedModuleId, course]);
  const { artifacts } = useArtifacts();
  const { setNavBarName } = useNavbar();

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

  const handleUpdateModule = (newModuleData: IModule) => {
    setModules([newModuleData, ...modules]);
  };

  if (courseLoading) return <div>Loading course details...</div>;
  if (courseError) return <div>Error: {courseError}</div>;

  return (
    <div className="course-detail-container">
      <h1>{course?.courseName}</h1>
      <p>{course?.description}</p>
      {showModulesPopup && (
        <ModulesAddPage
          edit={false}
          show={showModulesPopup}
          handleClose={handleCloseModulesPopup}
          courseId={courseId}
          handleUpdateModule={handleUpdateModule}
        />
      )}
      {showDocPopup && (
        <DocumentAddPage
          handleClose={handleCloseDocPopup}
          show={showDocPopup}
          id={courseId}
          documentType="course"
          edit={false}
        />
      )}
      <section className="modules-section mb-5">
        <h2>Moduler</h2>
        {userData?.UserRole === "teacher" && (
          <Button
            variant="primary"
            className="w-25 mb-3"
            onClick={handleShowModulesPopup}
          >
            Lägg till modul
          </Button>
        )}

        {modulesLoading && <p>Laddar moduler...</p>}
        {modulesError && <p>Fel: {modulesError}</p>}
        <div className="modules-grid">
          {modules &&
            modules.map((module) => (
              <div
                key={module.id}
                className="module-card"                
                onClick={() => {
                  navigate(`/modules/${module.id}`);
                  course &&
                    setNavBarName(
                      `${course?.courseName} / ${module.moduleName}`
                    );
                }}
              >
                <div className="module-card-header">
                  <span>{module.moduleName}</span>
                </div>
                <div className="module-card-body">
                  <p className="module-card-text">{module.description}</p>
                  <p className="module-card-date">
                    Startdatum: {new Date(module.startDate).toLocaleDateString('sv-SE')}
                  </p>
                  <p className="module-card-date">
                    Slutdatum: {new Date(module.endDate).toLocaleDateString('sv-SE')}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="materials-section">
        <h2>Kursmaterial</h2>
        <div className="mb-3">
          {userData?.UserRole === "teacher" && (
            <Button
              variant="primary"
              className="w-25"
              onClick={handleShowDocPopup}
            >
              Lägg till Kursmaterial
            </Button>
          )}
        </div>
        <ul className="materials-list">
          {artifacts && (
            <ul className="materials-list">
              {artifacts.map((artifact) => (
                <li key={artifact.id} className="material-item">
                  <span>{artifact.fileName}</span>
                  <span>
                    Uppladdningsdatum:{" "}
                    {artifact.uploadTime.substring(
                      0,
                      artifact.uploadTime.indexOf("T")
                    )}
                  </span>
                  <div className="material-actions ">
                    <button
                      onClick={() => downloadFile(artifact.id)}
                      className="btn btn-primary"
                    >
                      Öpnna fil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ul>
      </section>

      <section className="participants-section">
        {course && (
          <ParticipantList courseUser={course.users} courseId={course.id} />
        )}
      </section>
    </div>
  );
}
