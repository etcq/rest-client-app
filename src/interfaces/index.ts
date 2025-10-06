export interface IChildrenNode {
  children: React.ReactNode;
}

export type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';

export interface IHeader {
  id: string;
  key: string;
  value: string;
}

export interface IRequestData {
  url: string;
  method: string;
  body: string;
  headers: IHeader[];
}

export interface IRequestHistoryItem {
  id: string;
  timestamp: number;
  method: string;
  endpoint: string;
  requestSize: number;
  responseSize: number;
  statusCode: number;
  duration: number;
  errorDetails: string;
  path: string;
}
