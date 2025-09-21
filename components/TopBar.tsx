
import React, { useState, useEffect, useRef } from 'react';
import { DSLogo, SiriIcon, ControlCenterIcon, BatteryIcon, WifiIcon, BluetoothIcon } from './Icons';
import ControlCenter from './ControlCenter';
import Siri from './Siri';
import { useApp } from '../App';

const useTime = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);
    
    return time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

const useBattery = () => {
    const [batteryLevel, setBatteryLevel] = useState(100);
    const [isCharging, setIsCharging] = useState(false);

    useEffect(() => {
        // @ts-ignore
        if ('getBattery' in navigator) {
            // @ts-ignore
            navigator.getBattery().then(battery => {
                const updateBatteryStatus = () => {
                    setBatteryLevel(Math.floor(battery.level * 100));
                    setIsCharging(battery.charging);
                };
                updateBatteryStatus();
                battery.addEventListener('levelchange', updateBatteryStatus);
                battery.addEventListener('chargingchange', updateBatteryStatus);

                return () => {
                    battery.removeEventListener('levelchange', updateBatteryStatus);
                    battery.removeEventListener('chargingchange', updateBatteryStatus);
                };
            });
        }
    }, []);

    return { batteryLevel, isCharging };
};


export default function TopBar() {
    const [isControlCenterOpen, setControlCenterOpen] = useState(false);
    const [isSiriOpen, setSiriOpen] = useState(false);
    const [isDsMenuOpen, setDsMenuOpen] = useState(false);
    const { powerOff } = useApp();
    const time = useTime();
    const { batteryLevel } = useBattery();
    const dsMenuRef = useRef<HTMLDivElement>(null);

    const { openApp } = useApp();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dsMenuRef.current && !dsMenuRef.current.contains(event.target as Node)) {
                setDsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <>
            <header className="absolute top-0 left-0 right-0 h-7 bg-white/20 dark:bg-black/20 backdrop-blur-xl text-black dark:text-white text-sm z-50 flex justify-between items-center px-4">
                <div className="flex items-center space-x-4">
                    <div ref={dsMenuRef} className="relative">
                        <button onClick={() => setDsMenuOpen(!isDsMenuOpen)} className="p-1 rounded hover:bg-white/20">
                            <DSLogo className="w-4 h-4" />
                        </button>
                        {isDsMenuOpen && (
                             <div className="absolute top-full left-0 mt-1 w-60 bg-white/50 dark:bg-black/50 backdrop-blur-2xl rounded-lg shadow-2xl border border-white/10 dark:border-black/10 overflow-hidden">
                                <ul className="text-sm py-1">
                                    <li onClick={() => { openApp('finder'); setDsMenuOpen(false);}} className="px-4 py-1.5 hover:bg-blue-500 cursor-pointer">About This Dem</li>
                                    <li className="my-1 border-t border-gray-500/30"></li>
                                    <li className="px-4 py-1.5 hover:bg-blue-500 cursor-pointer">System Settings...</li>
                                    <li className="my-1 border-t border-gray-500/30"></li>
                                    <li onClick={powerOff} className="px-4 py-1.5 hover:bg-blue-500 cursor-pointer">Shut Down...</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <span className="font-semibold">Finder</span>
                </div>
                <div className="flex items-center space-x-4">
                    <WifiIcon className="w-5 h-5"/>
                    <BluetoothIcon className="w-5 h-5"/>
                    <div className="flex items-center space-x-1">
                        <span className="font-semibold">{batteryLevel}%</span>
                        <BatteryIcon level={batteryLevel} className="w-6 h-6" />
                    </div>
                    <button onClick={() => setControlCenterOpen(!isControlCenterOpen)} className="p-1 rounded hover:bg-white/20">
                        <ControlCenterIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => setSiriOpen(true)} className="p-1 rounded hover:bg-white/20">
                        <SiriIcon className="w-5 h-5" />
                    </button>
                    <span>{time}</span>
                </div>
            </header>
            <ControlCenter isOpen={isControlCenterOpen} onClose={() => setControlCenterOpen(false)} />
            <Siri isOpen={isSiriOpen} onClose={() => setSiriOpen(false)} />
        </>
    );
}
