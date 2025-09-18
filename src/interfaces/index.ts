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
  timestamp: Date;
  method: string;
  url: string;
  requestSize: number;
  responseSize: number;
  status?: number;
  duration?: number;
  error?: string;
}

