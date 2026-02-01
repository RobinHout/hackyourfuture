import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { optimism } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Aura Token Viewer',
    projectId: 'YOUR_PROJECT_ID', chains: [optimism],
    ssr: true, 
});
