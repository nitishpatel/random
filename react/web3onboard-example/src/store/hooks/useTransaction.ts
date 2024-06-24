import { useWeb3Store } from '../web3store';

import abi from "../../abi/erc20.json";
import {  multicall, readContract, waitForTransactionReceipt, writeContract } from '@web3-onboard/wagmi';

const useTransaction = () => {
  const {wagmiConfig} = useWeb3Store();

  const sendErc20 = async (tokenAddress:`0x${string}`, to:string, amount:string) => {
    const tx = await writeContract(wagmiConfig, {
      address: tokenAddress,
      abi: abi,
      functionName: 'transfer',
      args: [to, amount]
    })
    console.log('tx',tx);
    const receipt = await waitForTransactionReceipt(wagmiConfig, {
      hash: tx,
      confirmations:2
    });
    console.log('receipt',receipt);
  };

  const getErc20Balance = async (tokenAddress:`0x${string}`, address:string) => {
    const result = await multicall(wagmiConfig, {
    contracts:[
      {
        address: tokenAddress,
        abi: abi,
        functionName: 'balanceOf',
        args: [address]
      }
    ],
    multicallAddress:'0x1574aE4d1C2E93D3AfF58b19DA2c481F68802E17'
    })
    return result;
  };


  const getTotalBalance = async (tokenAddress:`0x${string}`) => {
    const result = await readContract(wagmiConfig, {
      abi,
      address: tokenAddress,
      functionName: 'totalSupply',
    })
    return result;
  };


  return {
    sendErc20,
    getErc20Balance,
    getTotalBalance
  };
};

export default useTransaction;
