import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth, useNavbar } from '../hooks';
import '../css/CourseDetailsPage.css'; 

// Mockdata ersätts med serverdata senare
const mockActivity = {
  id: '1',
  name: 'Introduktion till React',
  description: 'En översikt över React och dess grundläggande koncept.',
  moduleName: 'Webbutveckling',
  startTime: '2023-06-01T09:00:00',
  endTime: '2023-06-01T12:00:00',
  activityTypeName: 'Föreläsning'
};

const mockArtifacts = [
  { id: '1', fileName: 'React_intro.pdf', uploadTime: '2023-05-28T14:30:00', contentType: 'application/pdf' },
  { id: '2', fileName: 'React_övningar.docx', uploadTime: '2023-05-29T10:15:00', contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  { id: '3', fileName: 'React_presentation.pptx', uploadTime: '2023-05-30T16:45:00', contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }
];

export function ArtifactsDetailPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const { userData } = useAuth();
  const { setNavBarName } = useNavbar();

  useEffect(() => {    
    setNavBarName(`${mockActivity.moduleName} / ${mockActivity.name}`);
  }, []);

  const downloadFile = (documentId: string) => {   
    console.log(`Downloading file with id: ${documentId}`);
    alert('Filnedladdning simulerad. I en riktig implementation skulle filen öppnas här.');
  };

  return (
    <div className="course-detail-container">
      <h1>{mockActivity.name}</h1>
      <p>{mockActivity.description}</p>
      <p>Typ: {mockActivity.activityTypeName}</p>
      <p>Starttid: {new Date(mockActivity.startTime).toLocaleString()}</p>
      <p>Sluttid: {new Date(mockActivity.endTime).toLocaleString()}</p>

      <section className="materials-section">
        <h2>Aktivitetsmaterial</h2>
        <div className="mb-3">
          {userData?.UserRole === "teacher" && (
            <Link to={`/addDocument/${activityId}?documentType=activity`} className="btn btn-primary">
              Lägg till material
            </Link>
          )}
        </div>
        <ul className="materials-list">
          {mockArtifacts.map((artifact) => (
            <li key={artifact.id} className="material-item">
              <span>{artifact.fileName}</span>
              <span>
                Uppladdningsdatum: {new Date(artifact.uploadTime).toLocaleDateString()}
              </span>
              <div className="material-actions">
                <button onClick={() => downloadFile(artifact.id)} className="btn btn-primary">
                  Öppna fil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}