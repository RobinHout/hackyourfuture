export interface Token {
    name: string;
    symbol: string;
    address: string;
    description: string;
}

export const TOKENS: Token[] = [
    {
        name: 'Aura',
        symbol: 'AURA',
        address: '0xA4424fa67f268EDbed3Ed3892d4a6E753Db8baBe',
        description: 'The Aura token on Optimism.',
    },
    {
        name: 'Optimism',
        symbol: 'OP',
        address: '0x4200000000000000000000000000000000000042',
        description: 'The governance token for the Optimism Collective.',
    },
];

export function getTokenByAddress(address: string): Token | undefined {
    return TOKENS.find((token) => token.address.toLowerCase() === address.toLowerCase());
}
