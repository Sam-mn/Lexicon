import { BASE_URL, CustomError, ITokens } from ".";
import axios from 'axios';
import { ICourse, IModule, IActivity, IArtifact, IUser } from './interfaces';

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

export async function getModulesReq(courseId: number): Promise<IModule[]> {
  try {
    const response = await axios.get<IModule[]>(`${BASE_URL}/courses/${courseId}/modules`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching modules for course ${courseId}:`, error);
    throw error;
  }
}

export async function getActivitiesReq(moduleId: number): Promise<IActivity[]> {
  try {
    const response = await axios.get<IActivity[]>(`${BASE_URL}/modules/${moduleId}/activities`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
}

export async function getCourseDetails(courseId: number): Promise<ICourse> {
  const response = await axios.get(`${BASE_URL}/courses/${courseId}`);
  return response.data;
}

export async function getCourseActivities(courseId: number): Promise<IActivity[]> {
  const response = await axios.get(`${BASE_URL}/courses/${courseId}/activities`);
  return response.data;
}

export async function getCourseArtifacts(courseId: number): Promise<IArtifact[]> {
  const response = await axios.get(`${BASE_URL}/courses/${courseId}/artifacts`);
  return response.data;
}

export async function getCourseParticipants(courseId: number): Promise<IUser[]> {
  const response = await axios.get(`${BASE_URL}/courses/${courseId}/participants`);
  return response.data;
}