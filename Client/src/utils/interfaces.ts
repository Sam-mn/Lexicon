import { IconType } from 'react-icons';

export interface IAuthContext {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface INavbarContext {
  navBarName: string;
  setNavBarName: React.Dispatch<React.SetStateAction<string>>;
  isCourse: boolean;
  setIsCourse: React.Dispatch<React.SetStateAction<boolean>>;
  teacherName: string;
  setTeacherName: React.Dispatch<React.SetStateAction<string>>;
  NavbarIcon: IconType;
  courseCode: string;
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  setCourseCode: React.Dispatch<React.SetStateAction<string>>;
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
  endDate: string;
  courseCode: string;
  credits: number;
}

export interface IModule {
  id: string;
  moduleName: string;
  description: string;
  startDate: string;
  endDate: string;
  courseId: string;
}

export interface IModuleFormData {
  moduleName: string;
  description: string;
  startDate: string;
  endDate: string;
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
  activityTypeName: string;
}

export interface IArtifact {
  id: string;
  fileName: string;
  fileContent: string;
  description: string;
  uploadTime: string;
  ContentType: string;
}

export interface IUser {
  id: string;
  name: string;
  role: string;
  password: string;
  email: string;
}

export interface ISubmission extends IArtifact {
  status: 'pending' | 'approved' | 'rejected';
}