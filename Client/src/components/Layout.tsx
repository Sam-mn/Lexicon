import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { LoginStatusChip, Navbar } from '../components';

export function Layout(): ReactElement {
  return (
    <div className="authenticated-container">
      <header>
        <Navbar />
        <LoginStatusChip />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
