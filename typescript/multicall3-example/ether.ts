/**
 * @notice ethers.js (https://docs.ethers.org/v6/) does not have native Multicall3 support so this
 * example shows how to interact with the contract directly. This example shows how to reverse
 * resolve ENS names for a list of addresses. It uses the `aggregate3` method to support reverting
 * calls. To run the example:
 *   - Install dependencies with `pnpm install`
 *   - Run `pnpm ts-node ethers.ts`
 *
 * You can replace `pnpm` with the node package manager of your choice.
 */
import { Contract, Interface, JsonRpcProvider, namehash } from 'ethers';
import { MULTICALL_ADDRESS, MULTICALL_ABI_ETHERS } from './constants';

// Setup the provider (in viem, this is called a client).
const MAINNET_RPC_URL = "https://erpc.apothem.network";
if (!MAINNET_RPC_URL) throw new Error('Please set the MAINNET_RPC_URL environment variable.');
const provider = new JsonRpcProvider(MAINNET_RPC_URL);

// Get Multicall contract instance.
const multicall = new Contract(MULTICALL_ADDRESS, MULTICALL_ABI_ETHERS, provider);

async function example1() {
  // Define some users.
  const users = [
    '0x8700B87C2A053BDE8Cdc84d5078B4AE47c127FeB',
    '0x9EAB9D856a3a667dc4CD10001D59c679C64756E7',
    '0x78d32460D0a53Ac2678e869Eb6b4f6bA9d2Ef360',
    '0x3B60e31CFC48a9074CD5bEbb26C9EAa77650a43F',
    '0x99FBa19112f221D0B44c9c22241f5e6b2Db715F6',
    '0xE943CA883ef3294E0FC55a1A14591aBeAD1B5927',
    '0x26E3a9c84fdB9b7fE33Dfd5E8D273D016e4e4Fb6',
  ];

  // Create an interface the erc20 contract to fetch the balanceOf method.
  const iface = new Interface(['function balanceOf(address) view returns (uint256)']);

  // Create the calls to get the balance of each user.
  const calls = users.map((user) => ({
    target: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    callData: iface.encodeFunctionData('balanceOf', [user]),
  }));

  // Execute the calls.
  const response = await multicall.aggregate(calls);

  // Decode the response.
  const balances = response.returnData.map((data) => iface.decodeFunctionResult('balanceOf', data));
  for (let i = 0; i < users.length; i++) {
    console.log(`User ${users[i]} has ${balances[i][0]} DAI`);
  }
}

example1().catch(console.error);
