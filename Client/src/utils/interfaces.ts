export interface IAuthContext {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ICourse {
  id: number;
  courseName: string;
  description: string;
  startDate: string;
}

export interface IModule {
  id: number;
  moduleName: string;
  description: string;
  startDate: string;
  endDate: string;
  courseId: number;
}