
import React, { useState, useRef, useEffect } from 'react';
import { WifiIcon, BluetoothIcon, SunIcon, SpeakerIcon } from './Icons';

interface ControlCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

const ControlToggle: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => {
    const [isActive, setIsActive] = useState(true);
    return (
        <div className="flex items-center space-x-3">
            <button
                onClick={() => setIsActive(!isActive)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-blue-500 text-white' : 'bg-white/20 text-gray-200'}`}
            >
                {icon}
            </button>
            <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-gray-400">{isActive ? 'On' : 'Off'}</p>
            </div>
        </div>
    );
};

const Slider: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
    return (
        <div className="flex items-center space-x-2 bg-white/10 p-1 rounded-full">
            <div className="p-1.5">{icon}</div>
            <input type="range" className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
        </div>
    );
};

export default function ControlCenter({ isOpen, onClose }: ControlCenterProps) {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            ref={panelRef}
            className="absolute top-8 right-4 w-80 bg-black/50 backdrop-blur-2xl rounded-2xl p-4 text-white shadow-2xl z-50 border border-white/20"
        >
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-3">
                    <ControlToggle icon={<WifiIcon className="w-5 h-5" />} label="Wi-Fi" />
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                    <ControlToggle icon={<BluetoothIcon className="w-5 h-5" />} label="Bluetooth" />
                </div>
            </div>
            <div className="mt-4 space-y-3">
                <Slider icon={<SunIcon className="w-4 h-4" />} />
                <Slider icon={<SpeakerIcon className="w-4 h-4" />} />
            </div>
        </div>
    );
}
