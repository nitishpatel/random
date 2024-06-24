const { createPublicClient, http, parseAbi, formatUnits } = require('viem');
const { xdcTestnet } = require('viem/chains');
// Setup the client (in ethers.js, this is called a provider).
const client = createPublicClient({
  chain: xdcTestnet,
  transport: http('https://erpc.apothem.network'),
});

// ERC-20 token address and ABI for balanceOf method.
const TOKEN_ADDRESS = '0x1b9b08a75881CE738EE8eEC07e864C04bdA4667A';
const BALANCE_OF_ABI = parseAbi([
  'function balanceOf(address who) external view returns (uint256 balance)',
]);
const TOKEN = { address: TOKEN_ADDRESS, abi: BALANCE_OF_ABI };

// List of user addresses to query balances for.
const USER_ADDRESSES = [
  '0xF977814e90dA44bFA03b6295A0616a897441aceC',
  '0xB247cdE9C6A635d3F9FAdeF01F058D327f58fd00',
  // Add more user addresses as needed
];

async function multicallBalances() {
  // Create multicall requests for the balanceOf method for each user address.
  const balanceCalls = USER_ADDRESSES.map((userAddress) => {
    return {
      ...TOKEN,
      functionName: 'balanceOf',
      args: [userAddress],
    };
  });

  // Execute the multicall and get the balances. Set `allowFailure` to false to ensure all calls must succeed.
  const balances = await client.multicall({ contracts: balanceCalls, allowFailure: false });

  // Log the balances.
  console.log('User Balances');
  balances.map((balance, i) => {
    const userAddress = USER_ADDRESSES[i];
    const amount = Number(formatUnits(balance, 6)).toLocaleString(undefined, {});
    console.log(`  ${userAddress} balance: ${amount}`);
  });
}

multicallBalances().catch(console.error);
// 0x1574aE4d1C2E93D3AfF58b19DA2c481F68802E17