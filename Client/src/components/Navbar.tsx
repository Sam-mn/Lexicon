import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

export function Navbar(): ReactElement {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">        
        <li className="nav-item">
          <Link to="/courses" className="nav-link">Kurser</Link>
        </li>
        <li className="nav-item">
          <Link to="/modules" className="nav-link">Moduler</Link>
        </li>
        <li className="nav-item">
          <Link to="/activities" className="nav-link">Aktiviteter</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">Logga in</Link>
        </li>
      </ul>
    </nav>
  );
}