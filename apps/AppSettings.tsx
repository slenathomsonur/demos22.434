
import React, { useState } from 'react';
import { AppInstanceProps, Theme, NotchStyle } from '../types';
import { useApp } from '../App';
import { SunIcon, MoonIcon, DisplayIcon, InfoIcon } from '../components/Icons';
import { AppAbout } from './AppAbout';

const navItems = [
    { id: 'display', label: 'Display', icon: <DisplayIcon className="w-5 h-5" /> },
    { id: 'about', label: 'About', icon: <InfoIcon className="w-5 h-5" /> },
];

// FIX: Destructure instance prop to be available for child components.
export const AppSettings: React.FC<AppInstanceProps> = ({ instance }) => {
    const { 
        wallpaper, setWallpaper, 
        theme, setTheme, 
        notchStyle, setNotchStyle,
        // FIX: Get wallpapers from context to break circular dependency with constants.ts.
        wallpapers
    } = useApp();
    const [activeTab, setActiveTab] = useState('display');

    const renderContent = () => {
        switch (activeTab) {
            case 'display':
                return (
                     <div>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Display</h2>
                        
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Appearance</h3>
                            <div className="flex space-x-4 p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
                                <button onClick={() => setTheme(Theme.LIGHT)} className={`flex-1 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 ${theme === Theme.LIGHT ? 'bg-white dark:bg-gray-500 shadow' : ''}`}>
                                    <SunIcon className="w-5 h-5" /> Light
                                </button>
                                <button onClick={() => setTheme(Theme.DARK)} className={`flex-1 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 ${theme === Theme.DARK ? 'bg-gray-900 text-white shadow' : ''}`}>
                                    <MoonIcon className="w-5 h-5" /> Dark
                                </button>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Notch Style</h3>
                            <select value={notchStyle} onChange={(e) => setNotchStyle(e.target.value as NotchStyle)} className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value={NotchStyle.NOTCH}>Notch</option>
                                <option value={NotchStyle.DYNAMIC_ISLAND}>Dynamic Island</option>
                            </select>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Wallpaper</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {wallpapers.map(wp => (
                                    <button key={wp.name} onClick={() => setWallpaper(wp)} className={`relative rounded-lg overflow-hidden border-2 ${wallpaper.name === wp.name ? 'border-blue-500' : 'border-transparent'}`}>
                                        <img src={wp.url} alt={wp.name} className="w-full h-24 object-cover"/>
                                        <div className="absolute inset-0 bg-black/30"></div>
                                        <p className="absolute bottom-1 left-2 text-xs text-white font-semibold">{wp.name}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'about':
                // FIX: Pass instance prop to AppAbout to satisfy its required props.
                return <AppAbout instance={instance} isSettingsPane={true} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
            <nav className="w-48 p-4 border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
                <ul>
                    {navItems.map(item => (
                         <li key={item.id}>
                            <button
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-3 ${activeTab === item.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <main className="flex-1 p-8 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
};