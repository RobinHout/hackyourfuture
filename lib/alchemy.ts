import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || 'demo', // Replace with your Alchemy API Key.
    network: Network.OPT_MAINNET,
};

export const alchemy = new Alchemy(settings);
