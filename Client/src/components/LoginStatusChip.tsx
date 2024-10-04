import { ReactElement } from "react";
import { useAuth } from "../hooks";
import "../css/LoginStatusChip.css";
import { PiDoorOpenLight } from "react-icons/pi";

export function LoginStatusChip(): ReactElement {
  const { logout, userData } = useAuth();
  return (
    <div className="login-status-chip">
      <div className="user-info">
        <span className="user-name">{userData?.name}</span>
        <span className="user-role">{userData?.UserRole === "student" ? "Elev" : "Lärare"}</span>        
      </div>
      <button onClick={logout} className="logout-button">
        <PiDoorOpenLight className="logout-icon" />
        <span>Logga ut</span>
      </button>
    </div>
  );
}