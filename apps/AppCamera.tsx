
import React, { useRef, useEffect, useState } from 'react';
import { AppInstanceProps } from '../types';
import { CameraIcon } from '../components/Icons';

export const AppCamera: React.FC<AppInstanceProps> = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let stream: MediaStream | null = null;
        
        const startCamera = async () => {
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } else {
                    setError("Your browser does not support camera access.");
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError("Could not access the camera. Please check permissions.");
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center text-white">
            {error ? (
                <div className="text-center p-4">
                    <p className="text-red-500">{error}</p>
                    <CameraIcon className="w-24 h-24 text-gray-600 my-4" />
                </div>
            ) : (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                 <button className="w-16 h-16 bg-white rounded-full border-4 border-gray-500"></button>
            </div>
        </div>
    );
};
