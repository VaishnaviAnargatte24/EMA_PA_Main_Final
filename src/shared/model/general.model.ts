import { ComponentType, ReactNode } from 'react';

export interface Route {
  name: string;
  component: ComponentType;
  options?: any;
  backgroundColor: string;
  icon?: ReactNode;
  activeIcon?: ReactNode;
}

