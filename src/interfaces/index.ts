export interface IChildrenNode {
  children: React.ReactNode;
}

export type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';

export interface IRequestData {
  url: string;
  method: string;
  body: string;
  headers: Record<string, string>;
}

export interface IHeader {
  id: string;
  key: string;
  value: string;
}

