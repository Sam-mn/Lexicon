import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth, useNavbar } from "../hooks";
import "../css/CourseDetailsPage.css";
import { DocumentAddPage } from "./DocumentAddPage";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BASE_URL, IActivity } from "../utils";

export function ArtifactsDetailPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const [activityData, setActivityData] = useState<IActivity | null>(null);
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
  useEffect(() => {
    // setNavBarName(`${mockActivity.moduleName} / ${mockActivity.name}`);
    getActivities();
  }, []);

  const downloadFile = (documentId: string) => {
    console.log(`Downloading file with id: ${documentId}`);
    alert(
      "Filnedladdning simulerad. I en riktig implementation skulle filen öppnas här."
    );
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
          <Button variant="primary" className="w-25" onClick={handleShow}>
            Lägg till material
          </Button>
        </div>
        <ul className="materials-list">
          {/* {activityData?.map((artifact) => (
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
          ))} */}
        </ul>
      </section>
    </div>
  );
}
