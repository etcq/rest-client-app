import { useState } from 'react';

type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface IResponse {
  status?: number;
  body?: string | object | null;
  error?: string;
}

export const useFetchClient = () => {
  const [response, setResponse] = useState<IResponse>({});
  const [loading, setLoading] = useState(false);

  const sendRequest = async (url: string, method: TMethod, headers: Record<string, string>, body?: string) => {
    setLoading(true);
    setResponse({});

    try {
      const options: RequestInit = {
        method,
        headers,
      };

      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const contentType = res.headers.get('content-type');

      let responseBody;
      if (contentType?.includes('application/json')) {
        responseBody = await res.json();
      } else if (contentType?.startsWith('text/')) {
        responseBody = await res.text();
      } else if (contentType?.startsWith('image/')) {
        const blob = await res.blob();
        responseBody = URL.createObjectURL(blob);
      } else {
        responseBody = null;
      }

      setResponse({ status: res.status, body: responseBody });
    } catch (error) {
      setResponse({ status: 0, error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, sendRequest };
};
