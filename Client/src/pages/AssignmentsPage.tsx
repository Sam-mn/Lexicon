import { ReactElement, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useAuth, useCourses, useNavbar } from "../hooks";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BASE_URL, IActivity, IArtifact } from "../utils";
import axios from "axios";

export function AssignmentsPage(): ReactElement {
  const [assignment, setAssignment] = useState<IActivity[] | null>(null);
  const { setNavBarName } = useNavbar();

  const getCourseActivity = async () => {
    const res = await axios.get(`${BASE_URL}/Activities/courseActivity`);

    setAssignment(res.data);
  };

  useEffect(() => {
    getCourseActivity();
  }, []);

  return (
    <div className="dashboard-container p-3">
      <Table striped className="mt-3">
        <thead>
          <tr>
            <th style={{ width: "75%" }}>Uppgifter</th>
            <th>sista inlämningsdag</th>
          </tr>
        </thead>
        <tbody>
          {assignment?.map((c) => (
            <tr key={c.id}>
              <td>
                <Link
                  to={`/courses/${c.id}`}
                  className="edit-link text-dark"
                  onClick={() => {
                    // setNavBarName(c.courseName);
                  }}
                >
                  {c.name}
                </Link>
              </td>
              <td className="d-flex justify-content-between">
                {c.endTime.substring(0, c.endTime.indexOf("T"))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
