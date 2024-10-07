import axios from "axios";
import { ReactElement, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { BASE_URL } from "../utils";
import { useParams, useNavigate } from "react-router-dom";
import "../css/AddandEditPages.css";

interface PopupProps {
  show: boolean;
  handleClose: () => void;
  edit: boolean;
  courseId?: string | null;
  fetchCourseDetails: () => Promise<void>;
}

export const ParticipantsAddPage: React.FC<PopupProps> = ({
  show,
  handleClose,
  edit,
  courseId,
  fetchCourseDetails,
}) => {
  // const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/authentication`, {
        name: `${firstName} ${lastName}`,
        email,
        userRole,
        userName,
        password,
        courseId,
      });

      if (res.status === 201) {
        // navigate(`/courses/${courseId}`);
        handleClose();
        fetchCourseDetails();
      } else {
        setError("Något gick fel vid tillägg av deltagare.");
      }
    } catch (err) {
      console.error(err);
      setError("Ett fel uppstod. Kontrollera din anslutning och försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {edit ? "Redigera deltagare" : "Lägg till en ny deltagare"}
        </Modal.Title>
      </Modal.Header>
      <Container className="mt-4 maxHeight">
        <Row className="justify-content-md-center">
          <Col xs={11}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Förnamn*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ange deltagarens förnamn"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Efternamn*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ange deltagarens efternamn"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>E-post*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ange deltagarens e-postadress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Roll*</Form.Label>
                <Form.Select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  required
                >
                  <option value="">Välj roll</option>
                  <option value="student">Student</option>
                  <option value="teacher">Lärare</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Användarnamn*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ange deltagarens användarnamn"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Lösenord*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ange deltagarens lösenord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="mb-4 w-50"
                >
                  {loading ? "Lägger till..." : "Lägg till deltagare"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};
