import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { useConnectWallet } from "@web3-onboard/react";
import { useWeb3Store } from "./store/web3store";
import useBalance from "./store/hooks/useBalance";
import useTransaction from "./store/hooks/useTransaction";

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const { sendErc20,getErc20Balance ,getTotalBalance} = useTransaction();
  const balance = useBalance();
  useEffect(() => {
    if (wallet) {
      console.log("wallet", wallet);
      localStorage.setItem("wallet", wallet.label);
    } else {
      // Check if wallet is stored in local storage
      const localStorageWallet = localStorage.getItem("wallet");
      if (localStorageWallet) {
        connect({
          autoSelect: {
            label: localStorageWallet,
            disableModals: true,
          },
        });
      }
    }
  }, []);
  const { setConnectWallet, account, disconnectWallet } = useWeb3Store();
  useEffect(() => {
    if (wallet) {
      console.log("wallet", wallet);
      setConnectWallet(wallet);
    }
  }, [wallet]);
  return (
    <div className="App">
      <h2>
        {connecting
          ? "Connecting..."
          : wallet
          ? `Connected with ${wallet.label}`
          : "Not connected"}
      </h2>
      <div className="card">
        {account && <p>Account: {account}</p>}
        {balance && <p>Balance: {balance}</p>}
        {!wallet && <button onClick={() => connect()}>connect</button>}
        <button
          onClick={() => {
            console.log("disconnect", wallet?.label);
            if (wallet?.label) {
              disconnect({ label: wallet.label });
              disconnectWallet();
            }
          }}
        >
          disconnect
        </button>

        {wallet && (
          <button
            onClick={async () => {
             try{
              console.log('Amount before',await getErc20Balance("0xF9131A2ba743Eb3C2Dc62dA2EF289BaAD9Ee8A66","0x3c2070a2e512dd97881df8fa0af8f9889872fcad"));
              await sendErc20(
                "0xF9131A2ba743Eb3C2Dc62dA2EF289BaAD9Ee8A66",
                "0x3c2070a2e512dd97881df8fa0af8f9889872fcad",
                "10000000"
              );
              // console.log('Amount after',await getErc20Balance("0x1b9b08a75881CE738EE8eEC07e864C04bdA4667A","0xB247cdE9C6A635d3F9FAdeF01F058D327f58fd00"));
             }catch(e){
               console.log('Error',e);
             }
            }}
          >
            send
          </button>
        )}
                {wallet && (
          <button
            onClick={async () => {
             try{
              console.log('Total Supply : ',await getTotalBalance("0xF9131A2ba743Eb3C2Dc62dA2EF289BaAD9Ee8A66"));
             }catch(e){
               console.log('Error',e);
             }
            }}
          >
            Get Total Supply
          </button>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Blocknative, Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
