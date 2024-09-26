import { ReactElement } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useCourses } from "../hooks";
import { useNavbar } from "../hooks/useNavbar";

export function CoursesPage(): ReactElement {
  const {courses, error, loading} = useCourses();
  const { setNavBarName, setIsCourse } = useNavbar();
  return (
    <div className="dashboard-container p-3">
      <Table striped>
        <thead>
          <tr>
            <th style={{ width: "85%" }}>Kursnamn</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {courses?.map(c=>(
                    <tr>
                    <td><Link to={`/courses/${c.id}`} onClick={()=> {
                        setNavBarName(c.courseName);
                        setIsCourse(true);
                      }}>{c.courseName}</Link></td>
                    <td>
                      <Link to="">Redigera</Link>
                      <Link to="" className="mx-3">
                        Ta bort
                      </Link>
                    </td>
                  </tr>
                ))}
        </tbody>
      </Table>
    </div>
  );
}
