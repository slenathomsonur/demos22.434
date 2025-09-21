
import React from 'react';
import { AppInstanceProps } from '../types';

interface AppBrowserProps extends AppInstanceProps {
    url: string;
}

export const AppBrowser: React.FC<AppBrowserProps> = ({ url }) => {
    return (
        <div className="w-full h-full bg-white">
            <iframe 
                src={url}
                className="w-full h-full border-0"
                title={url}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            ></iframe>
        </div>
    );
};
