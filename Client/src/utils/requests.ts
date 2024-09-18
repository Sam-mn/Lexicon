import { BASE_URL, CustomError, ITokens } from ".";

export async function loginReq(username: string, password: string): Promise<ITokens> {
  const url = `${BASE_URL}/auth/login`;

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