import { ReactElement, ReactNode } from 'react';

export interface Route {
  path: string;
  element: ReactElement;
  handle: {
    label: string
    entityType: string
  };
}

export interface SecureRouteProps {
  children: ReactNode;
}