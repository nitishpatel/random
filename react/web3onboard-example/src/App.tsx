import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { useConnectWallet } from "@web3-onboard/react";
import { useWeb3Store } from "./store/web3store";
import useBalance from "./store/hooks/useBalance";
import useTransaction from "./store/hooks/useTransaction";
import Navbar from "./components/Navbar";

function App() {
  const [{ wallet, connecting }, connect ] = useConnectWallet();
  const { sendErc20,getErc20Balance,txnInProgress} = useTransaction();
  const [balance, setBalance] = useState("0");
  const [receipt, setReceipt] = useState("");
  useEffect(() => {
    if (wallet) {
      console.log("setting key", wallet);
      localStorage.setItem("wallet", wallet.label);
    } else {
      // Check if wallet is stored in local storage
      console.log("checking local storage");
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
  const { setConnectWallet, account } = useWeb3Store();
  useEffect(() => {
    if (wallet) {
      console.log("wallet", wallet);
      setConnectWallet(wallet);
      localStorage.setItem("wallet", wallet.label);
      localStorage.setItem("onboard.js:last_connected_wallet",JSON.stringify({label:wallet.label})); // BUG: onboard.js does not store wallet in local storage
    }
  }, [wallet]);
  return (
    <div className="App">
      <Navbar />
      <h2>
        {connecting
          ? "Connecting..."
          : wallet
          ? `Connected with ${wallet.label}`
          : "Not connected"}
      </h2>
      <div className="card">
        <div>
          <h2>ERC20 - Contract Address: 0x1b9b08a75881CE738EE8eEC07e864C04bdA4667A</h2>
          {balance && balance!=="0" && <h3>My Balance: {balance}</h3>}
        </div>
        {wallet && (
          <button
            onClick={async () => {
             try{
             const res =  await sendErc20(
                "0x1b9b08a75881CE738EE8eEC07e864C04bdA4667A",
                "0xB247cdE9C6A635d3F9FAdeF01F058D327f58fd00",
                "1000000"
              );
              setReceipt(res.transactionHash);
              setTimeout(async()=>{
                setReceipt('')
              },5000);
             }catch(e){
               console.log('Error',e);
             }
            }}
            className="gradient-button"
          >
            {txnInProgress ? "Sending..." : "Send"}
          </button>
        )}
                {wallet && (
          <button
          className="gradient-button"
            onClick={async () => {
             try{
              const result = await getErc20Balance("0x1b9b08a75881CE738EE8eEC07e864C04bdA4667A",account!);
              console.log('Amount',result);
            const formattedBalance = result[0]?.result as bigint/ BigInt(10**6);
              setBalance(formattedBalance.toString());
              setTimeout(async()=>{
                setBalance('0')
              },5000);
             }catch(e){
               console.log('Error',e);
             }
            }}
          >
            Get My Balance
          </button>
        )}

        {receipt && <h3>Transaction Hash: {JSON.stringify(receipt)}</h3>}
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
