import { ReactElement } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useCourses } from "../hooks";
import { useNavbar } from "../hooks/useNavbar";
import { FaEdit, FaTrash } from "react-icons/fa";

export function CoursesPage(): ReactElement {
  const { courses, error, loading } = useCourses();
  const { setNavBarName, setIsCourse } = useNavbar();
  return (
    <div className="dashboard-container p-3">
      <Link to="/addCourse" className="linkToNewCourse">
        Lägg till en ny kurs
      </Link>
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
                    setIsCourse(true);
                  }}
                >
                  {c.courseName}
                </Link>
              </td>
              <td className="d-flex justify-content-between">
                <Link to="" className="edit-link">
                  <FaEdit />
                  Redigera
                </Link>
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
