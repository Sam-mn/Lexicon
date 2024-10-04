import axios from "axios";
import { ReactElement, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Alert,
} from "react-bootstrap";
import { BASE_URL, IActivity } from "../utils";
import { useParams } from "react-router-dom";
import { useActivityTypes, useAuth } from "../hooks";
import "../css/AddandEditPages.css";

interface PopupProps {
  show: boolean;
  handleClose: () => void;
  edit: boolean;
  moduleId?: string | null;
  handleUpdateActivities?: (NewCourseData: IActivity) => void | undefined;
}

export const ActivitiesAddPage: React.FC<PopupProps> = ({
  show,
  handleClose,
  edit,
  moduleId,
  handleUpdateActivities,
}) => {
  // const { moduleId } = useParams<{ moduleId: string }>();
  const [activityeData, setActivityData] = useState<IActivity | null>();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();
  const {
    activityTypes,
    loading: typesLoading,
    error: typesError,
  } = useActivityTypes();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActivityData((prevalue: any) => {
      return {
        ...prevalue,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSuccess(false);
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/Activities`, {
        ...activityeData,
        moduleId,
        courseId: userData?.courseId,
      });

      if (res.status === 201) {
        setSuccess(true);
        handleUpdateActivities(res.data);
        handleClose();
        setActivityData(null);
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {edit ? "Redigera aktivitet" : "Lägg till en ny aktivitet"}
        </Modal.Title>
      </Modal.Header>
      <Container className="mt-4 ">
        <Row className="justify-content-md-center">
          <Col xs={11}>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Aktivitetsnamn*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ange aktivitetsnamn"
                  value={activityeData?.name}
                  name="name"
                  required
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Beskrivning*</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Ange aktivitetsbeskrivning"
                  value={activityeData?.description}
                  name="description"
                  required
                  rows={5}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Starttid*</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={activityeData?.startTime}
                  required
                  name="startTime"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sluttid*</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={activityeData?.endTime}
                  name="endTime"
                  required
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Aktivitetstyp*</Form.Label>
                <Form.Select
                  value={activityeData?.activityTypeId}
                  required
                  name="activityTypeId"
                  onChange={(e) =>
                    setActivityData({
                      ...activityeData,
                      activityTypeId: e.target.value,
                    })
                  }
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
                className="mb-4 w-50"
              >
                {loading ? "Lägger till..." : "Lägg till aktivitet"}
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
