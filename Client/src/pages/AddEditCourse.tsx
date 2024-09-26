import axios from "axios";
import { ReactElement, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../utils";

export function AddEditCourse(): ReactElement {
  const [courseName, setCourseName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [sucsses, setSucsses] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      setSucsses(false);
      const res = await axios.post(`${BASE_URL}/courses`, {
        description,
        courseName,
        startDate,
      });
      setLoading(true);
      
      console.log(res);
      if(res.status === 201){
        setSucsses(true)
        setCourseName("");
        setDescription("");
        setStartDate("");
        setError("");
        setLoading(false);
        }
        else{
          setLoading(false);
          setError("Something went wrong");
        }
      }catch(err){
        console.log(err)
        setLoading(false);
        setError("Something went wrong");
      }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Lägg till en ny kurs</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Kursnamn*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ange kursnamn"
                value={courseName}
                required
                onChange={(e) => setCourseName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Beskrivning*</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ange kursbeskrivning"
                value={description}
                required
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Startdatum*</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                required
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Add Course"}
            </Button>
            {error && <div className="error-message">{error}</div>}
            {sucsses && <div className="">Succes</div>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
