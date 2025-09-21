
import React, { useState } from 'react';
import { useApp } from '../App';
import { NotchStyle } from '../types';

export default function Notch() {
    const { notchStyle } = useApp();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        if (notchStyle === NotchStyle.DYNAMIC_ISLAND) {
            setIsExpanded(!isExpanded);
        }
    };
    
    const baseClasses = "absolute top-0 left-1/2 -translate-x-1/2 bg-black z-50 transition-all duration-500 ease-out";

    if (notchStyle === NotchStyle.NOTCH) {
        return <div className={`${baseClasses} w-48 h-7 rounded-b-xl`}></div>;
    }

    // Dynamic Island
    return (
        <div 
            className={`${baseClasses} rounded-full cursor-pointer flex items-center justify-center text-white text-xs px-4 overflow-hidden`}
            style={{ 
                width: isExpanded ? '300px' : '200px',
                height: isExpanded ? '80px' : '36px',
                top: '6px'
            }}
            onClick={handleClick}
        >
            {isExpanded ? (
                <div>
                    <p className="font-bold">Music Playing</p>
                    <p className="text-gray-400">Song Name - Artist</p>
                </div>
            ) : "Dynamic Island"}
        </div>
    );
}
