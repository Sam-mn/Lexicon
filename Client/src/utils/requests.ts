import { BASE_URL, CustomError, ITokens } from ".";
import axios from 'axios';
import { ICourse, IModule, IActivity, IArtifact, IUser, IActivityType } from './interfaces';

export async function loginReq(username: string, password: string): Promise<ITokens> {
  const url = `${BASE_URL}/authentication/login`;

  const response: Response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok === false) {
    throw new CustomError(response.status, "Could not login");
  }

  return (await response.json()) as ITokens;
}

// vi behöver komplettera med export async function refreshTokens

export async function getCoursesReq(): Promise<ICourse[]> {
  try {
    const response = await axios.get<ICourse[]>(`${BASE_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}

export async function getModulesReq(courseId: string): Promise<IModule[]> {
  try {
    const response = await axios.get<IModule[]>(`${BASE_URL}/courses/${courseId}/modules`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching modules for course ${courseId}:`, error);
    throw error;
  }
}

export async function addModuleReq(courseId:string, moduleData:Partial<IModule>):Promise<IModule> {
  try {
    const response = await axios.post<IModule>(`${BASE_URL}/courses/${courseId}/modules`, moduleData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding module:', error);
    throw error;
  }
}

export async function getActivitiesReq(moduleId: string): Promise<IActivity[]> {
  try {
    const response = await axios.get<IActivity[]>(`${BASE_URL}/modules/${moduleId}/activities`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching activities for module ${moduleId}:`, error);
    throw error;
  }
}

export async function getActivityTypesReq(): Promise<IActivityType[]> {
  try {
    const response = await axios.get<IActivityType[]>(`${BASE_URL}/activitytypes`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching activity types:', error);
    throw error;
  }
}

export async function getCourseDetails(courseId: string): Promise<ICourse> {
  const response = await axios.get(`${BASE_URL}/courses/${courseId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }) ;
  return response.data;
}

export async function getCourseActivities(courseId: string): Promise<IActivity[]> {
  const response = await axios.get(`${BASE_URL}/courses/${courseId}/activities`);
  return response.data;
}

export async function getCourseArtifacts(courseId: string): Promise<IArtifact[]> {
  const response = await axios.get(`${BASE_URL}/courses/${courseId}/artifacts`);
  return response.data;
}

export async function getCourseParticipants(courseId: string): Promise<IUser[]> {
  const response = await axios.get(`${BASE_URL}/courses/${courseId}/participants`);
  return response.data;
}