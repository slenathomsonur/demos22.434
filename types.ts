
import React from 'react';

export interface AppDefinition {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.FC<AppInstanceProps>;
  defaultSize?: { width: number; height: number };
}

export interface AppInstance extends AppDefinition {
  instanceId: string;
  zIndex: number;
}

export interface AppInstanceProps {
  instance: AppInstance;
}

export interface Wallpaper {
  name: string;
  url: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum NotchStyle {
    NOTCH = 'notch',
    DYNAMIC_ISLAND = 'dynamic-island',
}
