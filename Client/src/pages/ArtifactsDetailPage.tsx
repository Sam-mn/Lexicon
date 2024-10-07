import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth, useNavbar } from "../hooks";
import "../css/CourseDetailsPage.css";
import { DocumentAddPage } from "./DocumentAddPage";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BASE_URL, IActivity, IArtifact } from "../utils";

export function ArtifactsDetailPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const [activityData, setActivityData] = useState<IActivity | null>(null);
  const [activityDocs, setActivityDocs] = useState<IArtifact[] | null>(null);
  const [activityStudentDocs, setActivityStudentDocs] = useState<
    IArtifact[] | null
  >(null);
  const [activityStudentAssignment, setActivityStudentAssignment] = useState<
    IArtifact[] | null
  >(null);

  const { userData } = useAuth();
  const { setNavBarName } = useNavbar();
  const [showPopup, setShowPopup] = useState(false);

  const handleShow = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  const getActivities = async () => {
    const res = await axios.get(`${BASE_URL}/Activities/${activityId}`);
    setActivityData(res.data);
    console.log(res);
  };

  const getDocuments = async () => {
    const res = await axios.get(
      `${BASE_URL}/Activities/${activityId}/getDocuments`
    );
    console.log(res);
    setActivityDocs(res.data);
  };

  const getStudentDocuments = async () => {
    const res = await axios.get(
      `${BASE_URL}/Activities/${activityId}/getDocuments/${userData?.id}/student`
    );
    console.log(res);
    setActivityStudentDocs(res.data);
  };

  const getStudentAssignment = async () => {
    const res = await axios.get(`${BASE_URL}/Activities/${activityId}/teacher`);
    console.log(res);
    setActivityStudentAssignment(res.data);
  };

  const UpdateDoc = async () => {
    getDocuments();
    getStudentDocuments();
  };

  useEffect(() => {
    // setNavBarName(`${mockActivity.moduleName} / ${mockActivity.name}`);
    getActivities();
    getDocuments();
    if (
      activityData?.activityTypeName === "Assignment" &&
      userData?.UserRole === "student"
    ) {
      getStudentDocuments();
    }

    if (
      activityData?.activityTypeName === "Assignment" &&
      userData?.UserRole === "teacher"
    ) {
      getStudentAssignment();
    }
  }, [activityData?.activityTypeName, userData?.UserRole]);

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
      {showPopup && (
        <DocumentAddPage
          documentType="activity"
          edit={false}
          handleClose={handleClose}
          show={showPopup}
          id={activityId}
          handleUpdateDocs={UpdateDoc}
          userId={userData?.UserRole === "student" ? userData?.id : null}
        />
      )}
      <h1>{activityData?.name}</h1>
      <p>{activityData?.description}</p>
      <p>Typ: {activityData?.activityTypeName}</p>
      <p>Starttid: {new Date(activityData?.startTime).toLocaleString()}</p>
      <p>Sluttid: {new Date(activityData?.endTime).toLocaleString()}</p>

      <section className="materials-section">
        <h2>Aktivitetsmaterial</h2>
        <div className="mb-3">
          {userData?.UserRole === "teacher" && (
            <Button variant="primary" className="w-25" onClick={handleShow}>
              Lägg till material
            </Button>
          )}
        </div>
        <ul className="materials-list">
          {activityDocs?.map((artifact) => (
            <li key={artifact.id} className="material-item">
              <span>{artifact.fileName}</span>
              <span>
                Uppladdningsdatum:{" "}
                {new Date(artifact.uploadTime).toLocaleDateString()}
              </span>
              <div className="material-actions">
                <button
                  onClick={() => downloadFile(artifact.id)}
                  className="btn btn-primary"
                >
                  Öppna fil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {userData?.UserRole === "student" &&
        activityData?.activityTypeName === "Assignment" && (
          <section className="materials-section">
            <h2>Aktivitetsuppgift</h2>
            <div className="mb-3">
              <Button variant="primary" className="w-25" onClick={handleShow}>
                Lägg till din upggift
              </Button>
            </div>
            <ul className="materials-list">
              {activityStudentDocs?.map((artifact) => (
                <li key={artifact.id} className="material-item">
                  <span>{artifact.fileName}</span>
                  <span>
                    Uppladdningsdatum:{" "}
                    {new Date(artifact.uploadTime).toLocaleDateString()}
                  </span>
                  <span
                    className={`p-1 ${
                      artifact.status === "pending" && " bg-warning"
                    }
                    ${artifact.status === "approved" && " bg-success"}
                    ${artifact.status === "rejected" && " bg-danger"}`}
                  >
                    {artifact.status}
                  </span>
                  <div className="material-actions">
                    <button
                      onClick={() => downloadFile(artifact.id)}
                      className="btn btn-primary"
                    >
                      Öppna fil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

      {userData?.UserRole === "teacher" &&
        activityData?.activityTypeName === "Assignment" && (
          <section className="materials-section">
            <h2>Studenters uppgifter</h2>
            <ul className="materials-list">
              {activityStudentAssignment?.map((artifact) => (
                <li key={artifact.id} className="material-item">
                  <span>{artifact.fileName}</span>
                  <span>
                    Uppladdningsdatum:{" "}
                    {new Date(artifact.uploadTime).toLocaleDateString()}
                  </span>
                  <span
                    className={`p-1 ${
                      artifact.status === "pending" && " bg-warning"
                    }
                    ${artifact.status === "approved" && " bg-success"}
                    ${artifact.status === "rejected" && " bg-danger"}`}
                  >
                    {artifact.status}
                  </span>
                  <div className="material-actions">
                    <button
                      onClick={() => downloadFile(artifact.id)}
                      className="btn btn-primary"
                    >
                      Öppna fil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
    </div>
  );
}
