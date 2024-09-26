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
  id: string;
  courseName: string;
  description: string;
  startDate: string;
}

export interface IModule {
  id: string;
  moduleName: string;
  description: string;
  startDate: string;
  endDate: string;
  courseId: string;
}

export interface IActivityType {
  id: string;
  activityTypeName: string;
  type: string;
  description: string;
  moduleId: string;
}

export interface IActivity {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  moduleId: string;
  activityType: IActivityType;
}

export interface IArtifact {
  id: string;
  fileName: string;
  filePath: string;
  description: string;
  uploadTime: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}
