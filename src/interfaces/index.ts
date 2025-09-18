export interface IChildrenNode {
  children: React.ReactNode;
}

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
