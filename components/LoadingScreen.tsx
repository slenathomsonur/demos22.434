
import React from 'react';
import { DSLogo } from './Icons';

export default function LoadingScreen() {
    return (
        <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white select-none">
            <DSLogo className="w-24 h-24 mb-8 text-gray-500" />
            <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"></div>
            </div>
        </div>
    );
}
