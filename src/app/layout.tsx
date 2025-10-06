import type { Metadata } from 'next';
import type { IChildrenNode } from '@interfaces';

import '@styles/globals.css';

export const metadata: Metadata = {
  title: 'RESTFul client application',
  description: 'Postman clone',
};

export default async function RootLayout({ children }: IChildrenNode) {
  return children;
}
