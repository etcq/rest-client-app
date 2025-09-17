import type { IHeader } from '@interfaces';

export const convertHeadersArrayToObject = (headers: IHeader[]): Record<string, string> => {
  return Object.fromEntries(
    headers
      .filter((header: IHeader): string => header.key.trim())
      .map((header: IHeader): [string, string] => [header.key, header.value])
  );
};
