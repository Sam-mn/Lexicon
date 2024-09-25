import { ReactElement } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
export function CoursesPage(): ReactElement {
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
          <tr>
            <td>Programmering 1</td>
            <td>
              <Link to="">Redigera</Link>
              <Link to="" className="mx-3">
                Ta bort
              </Link>
            </td>
          </tr>
          <tr>
            <td>Kursnamn</td>
            <td>
              <Link to="">Redigera</Link>
              <Link to="" className="mx-3">
                Ta bort
              </Link>
            </td>
          </tr>
          <tr>
            <td>Kursnamn</td>
            <td>
              <Link to="">Redigera</Link>
              <Link to="" className="mx-3">
                Ta bort
              </Link>
            </td>
          </tr>
          <tr>
            <td>Kursnamn</td>
            <td>
              <Link to="">Redigera</Link>
              <Link to="" className="mx-3">
                Ta bort
              </Link>
            </td>
          </tr>
          <tr>
            <td>Kursnamn</td>
            <td>
              <Link to="">Redigera</Link>
              <Link to="" className="mx-3">
                Ta bort
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
