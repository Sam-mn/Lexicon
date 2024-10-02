import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/";
import { ITokens, TOKENS } from "../utils";
import { useLocalStorage } from "usehooks-ts";
interface IRequireAuthProps {
  children: ReactElement;
}

export function RequireAuth({ children }: IRequireAuthProps): ReactElement {
  const { isLoggedIn } = useAuth();
  const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
    TOKENS,
    null
  );
  if (!tokens) {
    console.log("Is not logged in, redirected to login");
    return <Navigate to="/login" />;
  }

  return children;
}
