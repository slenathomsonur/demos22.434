
import React from 'react';
import { useApp } from '../App';
import Window from './Window';
import Notch from './Notch';

export default function Desktop() {
    const { openApps, wallpaper } = useApp();

    return (
        <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url(${wallpaper.url})` }}
        >
            <Notch />
            {openApps.map((app) => (
                <Window key={app.instanceId} instance={app}>
                    <app.component instance={app} />
                </Window>
            ))}
        </div>
    );
}
