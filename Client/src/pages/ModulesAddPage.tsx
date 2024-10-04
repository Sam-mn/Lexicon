import { ReactElement, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FormField } from "../components";
import { useModuleForm } from "../hooks";

interface PopupProps {
  show: boolean;
  handleClose: () => void;
  edit: boolean;
  moduleId?: string | null;
  courseId?: string | null;
}

export const ModulesAddPage: React.FC<PopupProps> = ({
  show,
  handleClose,
  edit,
  moduleId,
  courseId,
}) => {
  // const { courseId } = useParams<{ courseId: string }>();
  const { formData, handleChange, handleSubmit, error, success, loading } =
    useModuleForm(courseId!);

  useEffect(() => {
    if (success) handleClose();
  }, [success]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {edit ? "Redigera modul" : "Lägg till en ny modul"}
        </Modal.Title>
      </Modal.Header>
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col xs={11}>
            <Form onSubmit={handleSubmit}>
              <FormField
                label="Modulnamn*"
                name="moduleName"
                type="text"
                value={formData.moduleName}
                onChange={handleChange}
                placeholder="Ange Modulnamn"
                required
              />
              <FormField
                label="Beskrivning*"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                required
                as="textarea"
                placeholder="Ange kursbeskrivning"
                rows={3}
              />
              <FormField
                label="Startdatum*"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              <FormField
                label="Slutdatum*"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
              <Button
                variant="primary"
                type="submit"
                className="mb-4 w-50"
                disabled={loading}
              >
                {loading ? "Lägger till..." : "Lägg till modul"}
              </Button>
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              {/* {success && (
                <Alert variant="success" className="mt-3">
                  Modul tillagd! Omdirigerar...
                </Alert>
              )} */}
            </Form>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};
