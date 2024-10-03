import axios from "axios";
import { ReactElement, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../utils";
import { useParams } from "react-router-dom";
import { useActivityTypes, useAuth } from "../hooks";
import "../css/AddandEditPages.css";

export function ActivitiesAddPage(): ReactElement {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [activityTypeId, setActivityTypeId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();
  const {
    activityTypes,
    loading: typesLoading,
    error: typesError,
  } = useActivityTypes();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSuccess(false);
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/activities`, {
        name,
        description,
        startTime,
        endTime,
        activityTypeId,
        moduleId,
        courseId: userData?.courseId,
      });

      if (res.status === 201) {
        setSuccess(true);
        setName("");
        setDescription("");
        setStartTime("");
        setEndTime("");
        setActivityTypeId("");
        setError("");
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

  if (typesLoading) return <div>Loading activity types ... </div>;
  if (typesError)
    return <div> Error loading activity types: {typesError} </div>;

  return (
    <Container className="mt-4 maxHieht">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Lägg till en ny aktivitet</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Aktivitetsnamn*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ange aktivitetsnamn"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Beskrivning*</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ange aktivitetsbeskrivning"
                value={description}
                required
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Starttid*</Form.Label>
              <Form.Control
                type="datetime-local"
                value={startTime}
                required
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sluttid*</Form.Label>
              <Form.Control
                type="datetime-local"
                value={endTime}
                required
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Aktivitetstyp*</Form.Label>
              <Form.Select
                value={activityTypeId}
                required
                onChange={(e) => setActivityTypeId(e.target.value)}
              >
                <option value="">Välj aktivitetstyp</option>
                {activityTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.activityTypeName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="mb-3"
            >
              {loading ? "Lägger till..." : "Lägg till aktivitet"}
            </Button>
            {error && <div className="error-message mt-3">{error}</div>}
            {success && (
              <div className="success-message mt-3">Aktivitet tillagd!</div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
