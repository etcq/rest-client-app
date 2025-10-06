// constants will be here
export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const TABS = {
  HEADERS: 'headers',
  BODY: 'body',
  CODE: 'code',
};

export const PARAMS = {
  METHOD: 'method',
  REQUEST: 'request',
};

export const appName = 'REST client';

export const layoutConfig = {
  headerHeight: 80,
  footerHeight: 60,
} as const;

export const paths = {
  main: '/',
  login: '/login',
  registration: '/registration',
  rest: '/restful-client',
  history: '/history',
  variables: '/variables',
} as const;

export const teamPersonsInfo = [
  { githubName: 'turik777', fullName: 'Artur Bazaluk' },
  { githubName: 'aQafresca', fullName: 'Sergey Buiko' },
  { githubName: 'etcq', fullName: 'Anton Sushnikov' },
];

export const github = 'https://github.com/';
