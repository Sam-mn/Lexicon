import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';
import '../css/Layout.css';

export function Layout(): ReactElement {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}