import {create} from 'zustand';
import { persist,devtools } from 'zustand/middleware';
import onboard from "../helper/web3-onboard";
import { getBalance } from '@web3-onboard/wagmi';

type Web3Store = {
  wagmiConfig: any,
  wallet: any,
  chainId: string,
  account: `0x${string}` | null,
  balance: string,
  onBoard: any,
  setConnectWallet: (connectedWallet:any) => void,
  disconnectWallet: () => void,
  pollBalance: () => void,
};

export const useWeb3Store = create<Web3Store>()(
  devtools(
    persist(
      (set,get) => ({
        wagmiConfig: null,
        account: null,
        chainId: '',
        wallet: null,
        balance: '0',
        onBoard: onboard,
        setConnectWallet: async(connectedWallet) => {
          set({
            wallet: connectedWallet,
            account: connectedWallet.accounts[0]['address'],
            wagmiConfig: onboard.state.get().wagmiConfig,

            // balance: connectedWallet.accounts[0]['balance']['XDC'],
          });
        },
        disconnectWallet: () => {
          console.log('disconnectWallet');
          localStorage.removeItem('wallet');
          set({
            wallet: null,
            account: null,
            wagmiConfig: {},
            balance: '0',
          });
        },
        pollBalance: async() => {
          const _wagmiConfig = get().wagmiConfig;
          const _account = get().account;
          if(_wagmiConfig && _account){
            const _balance = await getBalance(_wagmiConfig, {
              address: _account,
              unit:'ether'
            });
            set({balance: _balance['formatted']});
          }
        },
      }),
      {
        name: 'web3-store',
        partialize: (state) => ({
          account: state.account,
        }),
      },

    )
  )
);