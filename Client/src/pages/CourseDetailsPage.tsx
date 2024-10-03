import { ReactElement, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useArtifacts, useAuth, useCourseDetails, useModules, useNavbar } from "../hooks";
import "../css/CourseDetailsPage.css";
import axios from "axios";
import { BASE_URL } from "../utils";
import { ParticipantList } from "../components";

export function CourseDetailsPage(): ReactElement {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const {
    modules,
    loading: modulesLoading,
    error: modulesError,
  } = useModules(courseId);
  const { userData } = useAuth();
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const {
    course,
    loading: courseLoading,
    error: courseError,
  } = useCourseDetails(courseId);

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

  if (courseLoading) return <div>Loading course details...</div>;
  if (courseError) return <div>Error: {courseError}</div>;

  return (
    <div className="course-detail-container">
      <h1>{course?.courseName}</h1>
      <p>{course?.description}</p>

      <section className="modules-section mb-5">
        <h2>Modules</h2>
        {userData?.UserRole === "teacher" && (
          <Link
            to={`/courses/${courseId}/addModule`}
            className="btn btn-primary mb-3"
          >
            Lägg till modul
          </Link>
        )}
        {userData?.UserRole === "teacher"}

        {modulesLoading && <p>Loading modules...</p>}
        {modulesError && <p>Error: {modulesError}</p>}
        <div className="mt-4 d-flex flex-wrap">
          {modules &&
            modules.map((module) => (
              <div
                key={module.id}
                className="card bg-light mb-3"
                style={{
                  maxWidth: "20rem",
                  marginRight: "2rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/modules/${module.id}`);
                  course &&
                    setNavBarName(
                      `${course?.courseName} / ${module.moduleName}`
                    );
                }}
              >
                <div className="card-header d-flex justify-content-between">
                  <span>{module.moduleName}</span>
                </div>
                <div className="card-body">
                  <p className="card-text p-2">{module.description}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="materials-section">
        <h2>Kursmaterial</h2>
        <div className="mb-3">
          {userData?.UserRole === "teacher" && (
            <Link
              to={`/addDocument/${courseId}?documentType=course`}
              className="btn btn-primary"
            >
              Lägg till Kursmaterial
            </Link>
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
