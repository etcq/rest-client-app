import type { IRequestData } from '@interfaces';
import { Base64 } from 'js-base64';
import type { METHODS } from '@constants';
import { PARAMS } from '@constants';

export const encodeRequestToUrl = (requestData: IRequestData): string => {
  const { method, url, body, headers } = requestData;

  const dataToEncode = {
    url,
    body,
    headers,
  };

  const encodedData: string = Base64.encode(JSON.stringify(dataToEncode));

  const searchParams = new URLSearchParams();
  searchParams.set(PARAMS.METHOD, method);
  searchParams.set(PARAMS.REQUEST, encodedData);

  return `?${searchParams.toString()}`;
};

export const decodeUrlToRequest = (search: string): Partial<IRequestData> => {
  const searchParams = new URLSearchParams(search);
  const method: string | null = searchParams.get(PARAMS.METHOD);
  const encodedData: string | null = searchParams.get(PARAMS.REQUEST);

  if (!encodedData || !method) {
    return {};
  }

  try {
    const decodedJson: string = Base64.decode(encodedData);
    const decodedData: Partial<IRequestData> = JSON.parse(decodedJson);

    return {
      method: method as METHODS,
      url: decodedData.url,
      body: decodedData.body,
      headers: decodedData.headers,
    };
  } catch (error) {
    console.error('Failed to decode request data from URL:', error);
    return {};
  }
};
