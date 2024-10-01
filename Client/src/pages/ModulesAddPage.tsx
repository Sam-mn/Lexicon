import { ReactElement } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FormField } from '../components';
import { useModuleForm } from '../hooks';

export function ModulesAddPage(): ReactElement {
  const { courseId } = useParams<{ courseId: string }>();
  const { formData, handleChange, handleSubmit, error, success, loading } = useModuleForm(courseId!);
  
  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Lägg till en ny modul</h2>
          <Form onSubmit={handleSubmit}>
            <FormField
              label="Modulnamn*"
              name="moduleName"
              type="text"
              value={formData.moduleName}
              onChange={handleChange}
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
              rows={5}
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
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Lägger till...' : 'Lägg till modul'}
            </Button>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {success && (
              <Alert variant="success" className="mt-3">Modul tillagd! Omdirigerar...</Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
