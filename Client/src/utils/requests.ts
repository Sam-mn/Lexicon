import { BASE_URL, CustomError, ITokens } from ".";
import axios from 'axios';
import { ICourse } from './interfaces';

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