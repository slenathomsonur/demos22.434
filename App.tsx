
import React, { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { AppDefinition, AppInstance, Wallpaper, Theme, NotchStyle } from './types';
import { apps as appDefinitions, wallpapers } from './constants';
import Desktop from './components/Desktop';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import PowerOffScreen from './components/PowerOffScreen';
import LoadingScreen from './components/LoadingScreen';

interface AppContextType {
  openApp: (appId: string) => void;
  closeApp: (instanceId: string) => void;
  focusApp: (instanceId: string) => void;
  openApps: AppInstance[];
  wallpaper: Wallpaper;
  setWallpaper: (wallpaper: Wallpaper) => void;
  // FIX: Add wallpapers to the context to break a circular dependency.
  wallpapers: Wallpaper[];
  theme: Theme;
  setTheme: (theme: Theme) => void;
  notchStyle: NotchStyle;
  setNotchStyle: (style: NotchStyle) => void;
  powerOff: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};


export default function App() {
    const [openApps, setOpenApps] = useState<AppInstance[]>([]);
    const [wallpaper, setWallpaper] = useState<Wallpaper>(wallpapers[0]);
    const [theme, setTheme] = useState<Theme>(Theme.DARK);
    const [notchStyle, setNotchStyle] = useState<NotchStyle>(NotchStyle.NOTCH);
    const [isPoweringOff, setIsPoweringOff] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;
        setTheme(osTheme);

        // Display loading screen for a short duration
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const openApp = useCallback((appId: string) => {
        const appDef = appDefinitions.find(app => app.id === appId);
        if (!appDef) return;

        const newInstance: AppInstance = {
            ...appDef,
            instanceId: `${appId}-${Date.now()}`,
            zIndex: Math.max(0, ...openApps.map(a => a.zIndex)) + 1,
        };

        setOpenApps(prev => [...prev, newInstance]);
    }, [openApps]);

    const closeApp = useCallback((instanceId: string) => {
        setOpenApps(prev => prev.filter(app => app.instanceId !== instanceId));
    }, []);

    const focusApp = useCallback((instanceId:string) => {
        const maxZIndex = Math.max(0, ...openApps.map(app => app.zIndex));
        setOpenApps(prev => prev.map(app => 
            app.instanceId === instanceId ? { ...app, zIndex: maxZIndex + 1 } : app
        ));
    }, [openApps]);

    const powerOff = () => {
        setIsPoweringOff(true);
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isPoweringOff) {
        return <PowerOffScreen />;
    }

    const appContextValue: AppContextType = {
        openApp,
        closeApp,
        focusApp,
        openApps,
        wallpaper,
        setWallpaper,
        // FIX: Provide wallpapers through context.
        wallpapers,
        theme,
        setTheme,
        notchStyle,
        setNotchStyle,
        powerOff
    };

    return (
        <AppContext.Provider value={appContextValue}>
            <div className={`${theme === Theme.DARK ? 'dark' : ''} h-screen w-screen bg-black`}>
                <div className="h-full w-full font-sans text-white select-none">
                    <Desktop />
                    <TopBar />
                    <Dock />
                </div>
            </div>
        </AppContext.Provider>
    );
}
