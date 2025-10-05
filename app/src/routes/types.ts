import { ReactElement, ReactNode } from 'react';

export interface Route {
  path: string;
  element: ReactElement;
  handle: {
    label: string
  };
}

export interface SecureRouteProps {
  children: ReactNode;
}