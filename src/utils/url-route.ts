import type { IRequestData, IHeader } from '@interfaces';
import { Base64 } from 'js-base64';
import type { METHODS } from '@constants';

export const encodeRequestToUrl = (requestData: IRequestData): string => {
  const { method, url, body, headers } = requestData;

  const encodedUrl = encodeURIComponent(Base64.encode(url));
  const encodedBody = body ? `/${encodeURIComponent(Base64.encode(body))}` : '';

  const searchParams = new URLSearchParams();

  if (headers) {
    headers.forEach((header) => {
      if (header.key) {
        searchParams.set(header.key, header.value);
      }
    });
  }

  const queryString = searchParams.toString();

  return `/${method}/${encodedUrl}${encodedBody}${queryString ? `?${queryString}` : ''}`;
};

export const decodeUrlToRequest = (url: string): Partial<IRequestData> => {
  try {
    const baseUrl = window.location.origin;
    const urlObject = new URL(url, baseUrl);
    const pathParts = urlObject.pathname.split('/').filter(Boolean);
    const method = pathParts[0] as METHODS;
    const encodedUrl = pathParts[1];
    const encodedBody = pathParts[2];

    const decodedBody = encodedBody ? Base64.decode(decodeURIComponent(encodedBody)) : '';

    const headers: IHeader[] = [];

    urlObject.searchParams.forEach((value, name) => {
      headers.push({ id: crypto.randomUUID(), key: name, value });
    });

    let decodedUrl = '';

    if (encodedUrl) {
      try {
        decodedUrl = Base64.decode(encodedUrl);
      } catch (e) {
        console.error('Failed to decode URL from Base64:', e);
      }
    }

    return {
      method,
      url: decodedUrl,
      body: decodedBody,
      headers,
    };
  } catch (error) {
    console.error('Failed to decode URL:', error);
    return {};
  }
};
