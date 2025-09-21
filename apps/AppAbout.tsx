
import React from 'react';
import { AppInstanceProps } from '../types';
import { DSLogo } from '../components/Icons';

interface AppAboutProps extends AppInstanceProps {
    isSettingsPane?: boolean;
}

export const AppAbout: React.FC<AppAboutProps> = ({ isSettingsPane }) => {
    const containerClass = isSettingsPane ? "" : "w-full h-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white flex items-center justify-center p-4";
    const contentClass = isSettingsPane ? "" : "flex items-center space-x-8";
    const textAlignment = isSettingsPane ? "text-left" : "text-left";

    return (
        <div className={containerClass}>
            <div className={contentClass}>
                {!isSettingsPane && <DSLogo className="w-32 h-32 flex-shrink-0" />}
                <div className={textAlignment}>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Dem OS</h1>
                    <p className="text-gray-600 dark:text-gray-400">Version 1.0 (25A123)</p>
                    <div className="mt-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <p><span className="font-semibold w-24 inline-block">Model:</span> DemBook Pro (16-inch, 2025)</p>
                        <p><span className="font-semibold w-24 inline-block">Chip:</span> Dem M4</p>
                        <p><span className="font-semibold w-24 inline-block">Memory:</span> 32 GB</p>
                        <p><span className="font-semibold w-24 inline-block">Serial Number:</span> DSN0123456789XYZ</p>
                        <p><span className="font-semibold w-24 inline-block">Purchase Date:</span> October 24, 2025</p>
                    </div>
                     <div className="mt-6 text-xs text-gray-500 dark:text-gray-500">
                        <p>&copy; 2024 Dem Computer, Inc. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
