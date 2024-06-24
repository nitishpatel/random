import { useWeb3Store } from '../web3store';

import abi from "../../abi/erc20.json";
import {  multicall, readContract, waitForTransactionReceipt, writeContract } from '@web3-onboard/wagmi';
import { useState } from 'react';

const useTransaction = () => {
  const {wagmiConfig} = useWeb3Store();
  const [loading, setLoading] = useState(false);

  const sendTransaction = async (abi:any, address:`0x${string}`, functionName:string, args:any[]) => {
    setLoading(true);
    try {
      const tx = await writeContract(wagmiConfig, {
        address: address,
        abi: abi,
        functionName: functionName,
        args: args
      });
      const receipt = await waitForTransactionReceipt(wagmiConfig, {
        hash: tx,
        confirmations: 2
      });
      return receipt;
     } finally {
      setLoading(false);
    }
  };

  const sendErc20 = async (tokenAddress:`0x${string}`, to:string, amount:string) => {
    return sendTransaction(abi, tokenAddress, 'transfer', [to, amount]);
  };

  const readFromContract = async (abi:any, address:`0x${string}`, functionName:string, args:any[]) => {
    const result = await multicall(wagmiConfig, {
      contracts:[
        {
          address: address,
          abi: abi,
          functionName: functionName,
          args: args
        }
      ],
      multicallAddress:'0x1574aE4d1C2E93D3AfF58b19DA2c481F68802E17'
    })
    return result;
  };

  const getErc20Balance = async (tokenAddress:`0x${string}`, address:`0x${string}`) => {
    return readFromContract(abi, tokenAddress, 'balanceOf', [address]);
  };


  const getTotalBalance = async (tokenAddress:`0x${string}`) => {
    return readFromContract(abi, tokenAddress, 'totalSupply', []);
  };


  return {
    sendErc20,
    getErc20Balance,
    getTotalBalance,
    txnInProgress: loading
  };
};

export default useTransaction;
