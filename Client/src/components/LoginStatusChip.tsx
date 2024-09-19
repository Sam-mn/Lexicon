import { ReactElement } from "react";
import { useAuth } from "../hooks";

export function LoginStatusChip(): ReactElement {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div id="login-status-chip">
      <p>Logged in: {isLoggedIn.toString()}</p>
      <button disabled={!isLoggedIn} onClick={logout}>
        Log out
      </button>
    </div>
  );
}