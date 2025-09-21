
import React from 'react';
import { useApp } from '../App';
import { apps } from '../constants';

export default function Dock() {
    const { openApp, openApps } = useApp();

    const isAppOpen = (appId: string) => {
        return openApps.some(app => app.id === appId);
    }

    return (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40">
            <div className="flex items-end h-16 p-1.5 space-x-1 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 dark:border-black/10">
                {apps.map(app => (
                    <div key={app.id} className="relative flex flex-col items-center group">
                         <div className="absolute -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            {app.title}
                        </div>
                        <button
                            onClick={() => openApp(app.id)}
                            className="w-12 h-12 rounded-lg transition-transform duration-200 ease-in-out transform group-hover:-translate-y-2 group-hover:scale-125 flex items-center justify-center text-4xl"
                        >
                            {app.icon}
                        </button>
                        {isAppOpen(app.id) && <div className="w-1 h-1 bg-white/80 rounded-full mt-1"></div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
