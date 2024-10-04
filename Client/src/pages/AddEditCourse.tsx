import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Alert,
} from "react-bootstrap";
import { BASE_URL, ICourse } from "../utils";
interface PopupProps {
  show: boolean;
  handleClose: () => void;
  edit: boolean;
  courseId?: string | null;
}
export const AddEditCourse: React.FC<PopupProps> = ({
  show,
  handleClose,
  edit,
  courseId,
}) => {
  const [courseData, setCourseData] = useState<ICourse | null>();
  const [error, setError] = useState<string>("");
  const [sucsses, setSucsses] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData((prevalue: any) => {
      return {
        ...prevalue,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSucsses(false);
      let res;

      if (edit) {
        res = await axios.put(`${BASE_URL}/courses/${courseId}`, courseData);
      } else {
        res = await axios.post(`${BASE_URL}/courses`, courseData);
      }
      setLoading(true);
      if (res.status === 201 || res.status === 204) {
        handleClose();

        setError("");
        setLoading(false);
      } else {
        setLoading(false);
        setError("Something went wrong");
      }
      if (res.status === 201) {
        setCourseData(null);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Something went wrong");
    }
  };

  const getCourse = async () => {
    const response = await axios.get(`${BASE_URL}/courses/${courseId}`);
    setCourseData(response.data);
  };

  useEffect(() => {
    console.log("test");

    if (edit) {
      console.log("test");
      getCourse();
    }
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {edit ? "Redigera kurs" : "Lägg till en ny kurs"}
        </Modal.Title>
      </Modal.Header>
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col xs={11}>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Kursnamn*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ange kursnamn"
                  value={courseData?.courseName || ""}
                  required
                  name="courseName"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Beskrivning*</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Ange kursbeskrivning"
                  value={courseData?.description || ""}
                  required
                  rows={3}
                  name="description"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Poäng*</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ange kursnamn"
                  value={courseData?.credits || 0}
                  required
                  name="credits"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>kurs kod*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ange kursnamn"
                  value={courseData?.courseCode || ""}
                  required
                  name="courseCode"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Startdatum*</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={courseData?.startDate || ""}
                  required
                  name="startDate"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Slut Datum*</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={courseData?.endDate || ""}
                  required
                  name="endDate"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="mb-4 w-50"
              >
                {loading ? "Submitting..." : "Add Course"}
              </Button>

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};
