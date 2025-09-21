
import React, { useState, useEffect } from 'react';
import { askSiri } from '../services/geminiService';
import { SiriIcon } from './Icons';

interface SiriProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Siri({ isOpen, onClose }: SiriProps) {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setPrompt('');
            setResponse('');
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;
        setIsLoading(true);
        setResponse('');
        const result = await askSiri(prompt);
        setResponse(result);
        setIsLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="w-full max-w-lg bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center mb-4">
                    <SiriIcon className="w-16 h-16" />
                </div>
                <h2 className="text-center text-2xl font-semibold mb-4">What can I help you with?</h2>
                
                {isLoading && <p className="text-center my-4">Thinking...</p>}
                {response && <div className="my-4 p-4 bg-black/20 rounded-lg text-sm">{response}</div>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask me anything..."
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </form>
            </div>
        </div>
    );
}
