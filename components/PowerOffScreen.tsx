
import React from 'react';
import { DSLogo } from './Icons';

export default function PowerOffScreen() {
    return (
        <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white">
            <DSLogo className="w-24 h-24 mb-4 text-gray-500" />
            <p className="text-gray-600">Shutting down...</p>
        </div>
    );
}
