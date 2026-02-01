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
        name: 'Tether USD',
        symbol: 'USDT',
        address: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
        description: 'Stablecoin',
    },
    {
        name: 'USD Coin',
        symbol: 'USDC',
        address: '0x0b2c639c4d93f019623e1f729de172e253d097ff85',
        description: 'Stablecoin',
    },
    {
        name: 'Dai Stablecoin',
        symbol: 'DAI',
        address: '0xda10009c4fbfb0b3c0813ab5f58c7c7c13000da1',
        description: 'stablecoin',
    },
    {
        name: 'Wrapped Bitcoin',
        symbol: 'WBTC',
        address: '0x68f180fcce6a72e8deaa6ee2f3d70cd8e654be2095',
        description: 'Bitcoin on Ethereum/Optimism.',
    },
];

export function getTokenByAddress(address: string): Token | undefined {
    return TOKENS.find((token) => token.address.toLowerCase() === address.toLowerCase());
}
