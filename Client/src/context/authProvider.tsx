import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  CustomError,
  IAuthContext,
  ITokens,
  IUser,
  loginReq,
  TOKENS,
} from "../utils";
import { useLocalStorage } from "usehooks-ts";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
    TOKENS,
    null
  );
  const [userData, setUserData] = useState<IUser | null>(null);

  const values: IAuthContext = { isLoggedIn, login, logout, userData };

  const decodeToken = async (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      const payload: IUser = {
        name: decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
        id: decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
        UserRole:
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
        courseId:
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/version"
          ],
      };
      setUserData(payload);
      return payload;
    } catch (err) {
      console.log(err);
    }
  };

  async function login(username: string, password: string) {
    try {
      const tokens = await loginReq(username, password);
      setTokens(tokens);
      const data = await decodeToken(tokens.accessToken);
      return data;
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error);
      }
    }
  }

  function logout() {
    clearTokens();
    setUserData(null);
  }

  useEffect(() => {
    if (tokens === null) setIsLoggedIn(false);
    if (tokens) {
      setIsLoggedIn(true);
      decodeToken(tokens.accessToken);
    }
  }, [tokens]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
