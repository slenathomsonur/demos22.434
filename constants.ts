
import { AppDefinition, Wallpaper } from './types';
import { AppSettings } from './apps/AppSettings';
import { AppCamera } from './apps/AppCamera';
import { AppCalculator } from './apps/AppCalculator';
import { AppBrowser } from './apps/AppBrowser';
import { AppAbout } from './apps/AppAbout';
import { AppMusic, AppMaps, AppAppStore } from './apps/AppPlaceholders';
import { AppScreenMirror } from './apps/AppScreenMirror';

import { 
    FinderIcon, SettingsIcon, CameraIcon, CalculatorIcon, 
    ChromeIcon, MusicIcon, MapsIcon, AppStoreIcon, CinnyIcon, DiscordIcon, ScreenMirrorIcon
} from './components/Icons';


// FIX: Corrected the 'apps' array definition to resolve multiple errors.
// - Icons are now passed as JSX elements (e.g., `<FinderIcon />`).
// - The required 'component' property has been added to all app definitions.
// - Browser-based apps now correctly use a function to pass the 'url' prop to `AppBrowser`.
export const apps: AppDefinition[] = [
  { id: 'finder', title: 'Finder', icon: <FinderIcon />, component: AppAbout, defaultSize: { width: 600, height: 400 } },
  { id: 'settings', title: 'Settings', icon: <SettingsIcon />, component: AppSettings, defaultSize: { width: 800, height: 600 } },
  { id: 'camera', title: 'Camera', icon: <CameraIcon />, component: AppCamera, defaultSize: { width: 640, height: 520 } },
  { id: 'calculator', title: 'Calculator', icon: <CalculatorIcon />, component: AppCalculator, defaultSize: { width: 320, height: 480 } },
  { id: 'google', title: 'Google', icon: <ChromeIcon />, component: (props) => <AppBrowser {...props} url="https://google.com" />, defaultSize: { width: 1024, height: 768 } },
  { id: 'cinny', title: 'Cinny', icon: <CinnyIcon />, component: (props) => <AppBrowser {...props} url="https://cinny.im" />, defaultSize: { width: 1024, height: 768 } },
  { id: 'discord', title: 'Discord', icon: <DiscordIcon />, component: (props) => <AppBrowser {...props} url="https://discord.com/app" />, defaultSize: { width: 1024, height: 768 } },
  { id: 'screenmirror', title: 'Screen Mirror', icon: <ScreenMirrorIcon />, component: AppScreenMirror, defaultSize: { width: 1024, height: 640 } },
  { id: 'music', title: 'Music', icon: <MusicIcon />, component: AppMusic, defaultSize: { width: 800, height: 600 } },
  { id: 'maps', title: 'Maps', icon: <MapsIcon />, component: AppMaps, defaultSize: { width: 1024, height: 768 } },
  { id: 'appstore', title: 'App Store', icon: <AppStoreIcon />, component: AppAppStore, defaultSize: { width: 1024, height: 768 } },
];

export const wallpapers: Wallpaper[] = [
    { name: 'Dem OS Default', url: 'https://picsum.photos/seed/macos/3840/2160' },
    { name: 'Sonoma', url: 'https://picsum.photos/seed/sonoma/3840/2160' },
    { name: 'Ventura', url: 'https://picsum.photos/seed/ventura/3840/2160' },
    { name: 'Monterey', url: 'https://picsum.photos/seed/monterey/3840/2160' },
    { name: 'Big Sur', url: 'https://picsum.photos/seed/bigsur/3840/2160' },
];
