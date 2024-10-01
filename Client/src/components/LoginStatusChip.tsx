import { ReactElement } from "react";
import { useAuth } from "../hooks";
import "../css/LoginStatusChip.css";
import { PiDoorOpenLight } from "react-icons/pi";

export function LoginStatusChip(): ReactElement {
  const { logout } = useAuth();

  return (
    <div className="login-status-chip">
      <button onClick={logout}>
        {" "}
        <PiDoorOpenLight style={{ paddingRight: "0.3rem" }} size={25} />
        Log out
      </button>
    </div>
  );
}
