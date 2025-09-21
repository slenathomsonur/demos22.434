
import React, { useState, useRef, useEffect } from 'react';
import { AppInstance } from '../types';
import { useApp } from '../App';

interface WindowProps {
    instance: AppInstance;
    children: React.ReactNode;
}

export default function Window({ instance, children }: WindowProps) {
    const { closeApp, focusApp } = useApp();
    const [position, setPosition] = useState({ 
        x: window.innerWidth / 2 - (instance.defaultSize?.width ?? 600) / 2, 
        y: window.innerHeight / 2 - (instance.defaultSize?.height ?? 400) / 2 
    });
    
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('.window-control')) return;
        focusApp(instance.instanceId);
        setIsDragging(true);
        dragStartPos.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStartPos.current.x,
            y: e.clientY - dragStartPos.current.y,
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={windowRef}
            className="absolute bg-gray-200/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-xl shadow-2xl overflow-hidden border border-white/20 dark:border-black/20 flex flex-col"
            style={{
                top: position.y,
                left: position.x,
                zIndex: instance.zIndex,
                width: instance.defaultSize?.width ?? 600,
                height: instance.defaultSize?.height ?? 400,
                cursor: isDragging ? 'grabbing' : 'default',
            }}
            onMouseDown={() => focusApp(instance.instanceId)}
        >
            <div
                className="h-9 bg-gray-300/80 dark:bg-gray-900/80 flex items-center px-3 flex-shrink-0"
                onMouseDown={handleMouseDown}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
                <div className="flex space-x-2 window-control">
                    <button onClick={() => closeApp(instance.instanceId)} className="w-3 h-3 bg-red-500 rounded-full"></button>
                    <button className="w-3 h-3 bg-yellow-500 rounded-full"></button>
                    <button className="w-3 h-3 bg-green-500 rounded-full"></button>
                </div>
                <span className="flex-1 text-center text-sm font-medium text-gray-800 dark:text-gray-200 truncate pr-16">{instance.title}</span>
            </div>
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    );
}
