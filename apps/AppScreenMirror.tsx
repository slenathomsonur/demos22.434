
import React, { useRef, useState } from 'react';
import { AppInstanceProps } from '../types';
import { ScreenMirrorIcon } from '../components/Icons';

export const AppScreenMirror: React.FC<AppInstanceProps> = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [status, setStatus] = useState<'idle' | 'streaming' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    const stopStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    const handleStartMirroring = async () => {
        stopStream();
        setStatus('idle');
        setError(null);
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: { cursor: "always" } as MediaTrackConstraints,
                    audio: false
                });
                streamRef.current = stream;
                
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setStatus('streaming');
                }

                stream.getVideoTracks()[0].addEventListener('ended', () => {
                    setStatus('idle');
                    setError("Screen sharing has ended.");
                    stopStream();
                });

            } else {
                setError("Your browser does not support screen mirroring.");
                setStatus('error');
            }
        } catch (err) {
            console.error("Error starting screen mirror:", err);
            if (err instanceof Error && err.name === 'NotAllowedError') {
                setError("Permission to share screen was denied.");
            } else {
                setError("Could not start screen mirroring.");
            }
            setStatus('error');
        }
    };
    
    // Cleanup on component unmount
    React.useEffect(() => {
        return () => {
            stopStream();
        }
    }, []);

    return (
        <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center text-white relative">
            {status === 'streaming' ? (
                <video ref={videoRef} autoPlay className="w-full h-full object-contain bg-black"></video>
            ) : (
                <div className="text-center p-4">
                    <ScreenMirrorIcon className="w-24 h-24 text-gray-500 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Screen Mirroring</h2>
                    {error && <p className="text-red-400 mb-4">{error}</p>}
                    <p className="text-gray-400 mb-6">Click the button below to start sharing your screen.</p>
                    <button
                        onClick={handleStartMirroring}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                    >
                        Start Sharing
                    </button>
                </div>
            )}
        </div>
    );
};
