
import React from 'react';
import { AppInstanceProps } from '../types';

const Placeholder: React.FC<{appName: string, icon: React.ReactNode}> = ({ appName, icon }) => {
    return (
        <div className="w-full h-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 flex flex-col items-center justify-center">
            <div className="text-6xl mb-4">{icon}</div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{appName}</h1>
            <p className="mt-2">This feature is not yet available in Dem OS.</p>
        </div>
    );
};

import { MusicIcon, MapsIcon, AppStoreIcon } from '../components/Icons';

export const AppMusic: React.FC<AppInstanceProps> = () => <Placeholder appName="Music" icon={<MusicIcon />} />;
export const AppMaps: React.FC<AppInstanceProps> = () => <Placeholder appName="Maps" icon={<MapsIcon />} />;
export const AppAppStore: React.FC<AppInstanceProps> = () => <Placeholder appName="App Store" icon={<AppStoreIcon />} />;
