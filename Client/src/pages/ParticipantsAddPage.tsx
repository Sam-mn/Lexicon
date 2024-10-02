import axios from 'axios';
import { ReactElement, useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { BASE_URL } from '../utils';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/AddandEditPages.css';


export function ParticipantsAddPage(): ReactElement {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/courses/${courseId}/participants`,
        {
          name: firstName + lastName,
          email,
          role,
        }
      );

      if (res.status === 201) {
        navigate(`/courses/${courseId}`);
      } else {
        setError('Något gick fel vid tillägg av deltagare.');
      }
    } catch (err) {
      console.error(err);
      setError('Ett fel uppstod. Kontrollera din anslutning och försök igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 maxHeight">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Lägg till en ny deltagare</h2>
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
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
                type="text"
                placeholder="Ange deltagarens lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Lägger till...' : 'Lägg till deltagare'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate(`/courses/${courseId}`)}
              >
                Avbryt
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
