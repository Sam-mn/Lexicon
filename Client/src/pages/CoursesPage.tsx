import { ReactElement, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useCourses, useNavbar } from "../hooks";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AddEditCourse } from "./AddEditCourse";
import { Button } from "react-bootstrap";

export function CoursesPage(): ReactElement {
  const { courses, error, loading } = useCourses();
  const { setCredits, setCourseCode, setNavBarName, setIsCourse } = useNavbar();
  const [showPopup, setShowPopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(null);
  const handleShow = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  return (
    <div className="dashboard-container p-3">
      {showPopup && (
        <AddEditCourse
          handleClose={handleClose}
          show={showPopup}
          edit={edit}
          courseId={courseId}
        />
      )}

      <Button
        variant="primary"
        className="w-25"
        onClick={() => {
          setEdit(false);
          handleShow();
        }}
      >
        Lägg till en ny kurs
      </Button>
      <Table striped className="mt-3">
        <thead>
          <tr>
            <th style={{ width: "75%" }}>Kursnamn</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((c) => (
            <tr key={c.id}>
              <td>
                <Link
                  to={`/courses/${c.id}`}
                  className="edit-link text-dark"
                  onClick={() => {
                    setNavBarName(c.courseName);
                    setCourseCode(c.courseCode);
                    setCredits(c.credits);
                    setIsCourse(true);
                  }}
                >
                  {c.courseName}
                </Link>
              </td>
              <td className="d-flex justify-content-between">
                <div
                  className="edit-link"
                  onClick={() => {
                    setEdit(true);
                    setCourseId(c.id);
                    handleShow();
                  }}
                >
                  <FaEdit />
                  Redigera
                </div>
                <button className="delete-button w-50">
                  <FaTrash /> Ta bort
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
