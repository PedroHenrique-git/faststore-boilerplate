export async function fetchApi<T>(
  url: string,
  config?: RequestInit,
): Promise<T | null> {
  try {
    const request = await fetch(url, {
      ...config,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        ...config?.headers,
      },
    });
    return request.json();
  } catch (_) {
    return null;
  }
}
