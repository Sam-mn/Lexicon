import axios from "axios";
import { ReactElement, useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { BASE_URL } from "../utils";
import { useLocation, useParams } from "react-router-dom";
import "../css/AddandEditPages.css";
interface PopupProps {
  show: boolean;
  handleClose: () => void;
  edit: boolean;
  id?: string | null;
  documentType: "course" | "module" | "activity";
}
export const DocumentAddPage: React.FC<PopupProps> = ({
  show,
  handleClose,
  edit,
  id,
  documentType,
}) => {
  const [fileName, setFileName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const documentType = queryParams.get("documentType");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(documentType);
    try {
      setSuccess(false);
      setLoading(true);
      console.log(file);
      const res = await axios.post(
        `${BASE_URL}/Artifacts`,
        {
          fileName,
          description,
          file,
          contentType: file?.type,
          courseId: documentType === "course" ? id : null,
          moduleId: documentType === "module" ? id : null,
          activityId: documentType === "activity" ? id : null,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        setSuccess(true);
        setFileName("");
        setDescription("");
        setError("");
        handleClose();
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {edit ? "Redigera dokument" : "Lägg till en ny dokument"}
        </Modal.Title>
      </Modal.Header>
      <Container className="mt-4 maxHieht">
        <Row className="justify-content-md-center">
          <Col xs={11}>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Filnamn*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ange filnamn"
                  value={fileName}
                  required
                  onChange={(e) => setFileName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Beskrivning*</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Ange beskrivning"
                  value={description}
                  required
                  rows={5}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ladda upp din fil här*</Form.Label>
                <Form.Control
                  type="file"
                  required
                  onChange={handleFileChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="mb-4 w-50"
              >
                {loading ? "Lägger till..." : "Lägg till dokument"}
              </Button>
              {error && <div className="error-message mt-3">{error}</div>}
              {success && (
                <div className="success-message mt-3">dokument tillagd!</div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};
