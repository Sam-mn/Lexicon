import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/";

interface IRequireAuthProps {
  children: ReactElement;
}

export function RequireAuth({ children }: IRequireAuthProps): ReactElement {
    const { isLoggedIn } = useAuth();
  
    if (isLoggedIn === false) {
      console.log("Is not logged in, redirected to login");
      return <Navigate to="/login" />;
    }
  
    return children;
  }