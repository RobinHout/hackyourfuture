import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Aura Token Viewer',
  projectId: 'YOUR_PROJECT_ID', // User will need to replace this or we can use a public one for dev if allowed, but RainbowKit needs one.
  chains: [mainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export const AURA_TOKEN_ADDRESS = '0xA4424fa67f268EDbed3Ed3892d4a6E753Db8baBe';
