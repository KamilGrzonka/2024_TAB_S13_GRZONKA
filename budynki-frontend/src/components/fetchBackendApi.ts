import { entityDateToDate } from "@/utils/convertDates";

export async function fetchBackendApi<T>(
  endpoint: string,
  method: string = "GET",
  body?: unknown,
) {
  endpoint = endpoint.replace(/^\/+/, "");
  const response = await fetch(`http://localhost:8080/api/${endpoint}`, {
    method: method,
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: body ? JSON.stringify(body) : null,
  });
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`);
  }
  const responseJson: T = await response.json();

  return entityDateToDate(responseJson);
}

export async function getBackendApi<T>(endpoint: string, body?: unknown) {
  return fetchBackendApi<T>(endpoint, "GET", body);
}

export async function postBackendApi<T>(endpoint: string, body?: unknown) {
  return fetchBackendApi<T>(endpoint, "POST", body);
}

export async function putBackendApi<T>(endpoint: string, body?: unknown) {
  return fetchBackendApi<T>(endpoint, "PUT", body);
}

export async function patchBackendApi<T>(endpoint: string, body?: unknown) {
  return fetchBackendApi<T>(endpoint, "PATCH", body);
}

export async function deleteBackendApi<T>(endpoint: string, body?: unknown) {
  return fetchBackendApi<T>(endpoint, "DELETE", body);
}
