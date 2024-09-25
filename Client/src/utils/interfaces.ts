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

export interface IActivityType {
  id: number;
  activityTypeName: string;
  type: string;
  description: string;
}

export interface IActivity {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  moduleId: number;
  activityType: IActivityType;
}

export interface IArtifact {
  id: number;
  fileName: string;
  filePath: string;
  description: string;
  uploadTime: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
}
