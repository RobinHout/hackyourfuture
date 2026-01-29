import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface HolderWithBalance {
    address: string;
    balance: bigint;
}

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || 'demo';
const ALCHEMY_URL = `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const tokenAddress = searchParams.get('address');

        if (!tokenAddress) {
            return NextResponse.json({ error: 'Token address is required' }, { status: 400 });
        }

        // 1. Get all owners (addresses only)
        const ownersResponse = await fetch(ALCHEMY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 1,
                jsonrpc: '2.0',
                method: 'alchemy_getOwnersForToken',
                params: [tokenAddress],
            }),
        });

        const ownersData = await ownersResponse.json();
        if (ownersData.error) {
            throw new Error(ownersData.error.message);
        }

        const owners: string[] = ownersData.result.owners;

        // 2. Limit to top 50 to avoid timeouts
        const subsetOwners = owners.slice(0, 50);

        // 3. Fetch balances for these owners
        // We can use Promise.all with fetch
        const balancesPromises = subsetOwners.map(async (owner) => {
            try {
                const balanceResponse = await fetch(ALCHEMY_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: 1,
                        jsonrpc: '2.0',
                        method: 'alchemy_getTokenBalances',
                        params: [owner, [tokenAddress]],
                    }),
                });
                const balanceData = await balanceResponse.json();
                const balanceHex = balanceData.result?.tokenBalances?.[0]?.tokenBalance;
                return {
                    address: owner,
                    balance: balanceHex ? BigInt(balanceHex) : 0n,
                };
            } catch (e) {
                console.error(`Failed to fetch balance for ${owner}`, e);
                return { address: owner, balance: 0n };
            }
        });

        const holdersWithBalances: HolderWithBalance[] = await Promise.all(balancesPromises);

        // 4. Sort by balance (descending)
        holdersWithBalances.sort((a, b) => (b.balance > a.balance ? 1 : -1));

        // 5. Serialize BigInt for JSON
        const serialized = holdersWithBalances.map((h) => ({
            address: h.address,
            balance: h.balance.toString(),
        }));

        return NextResponse.json(serialized);
    } catch (error) {
        console.error('Error fetching holders:', error);
        return NextResponse.json({ error: 'Failed to fetch holders' }, { status: 500 });
    }
}
