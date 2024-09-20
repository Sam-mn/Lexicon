import { ReactElement } from "react";
import { useAuth } from "../hooks";
import '../css/LoginStatusChip.css';

export function LoginStatusChip(): ReactElement {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="login-status-chip">
      <p>Logged in: {isLoggedIn.toString()}</p>
      <button disabled={!isLoggedIn} onClick={logout}>
        Log out
      </button>
    </div>
  );
}