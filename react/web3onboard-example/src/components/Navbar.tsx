import { useConnectWallet } from "@web3-onboard/react";
import React from "react";
import { useWeb3Store } from "../store/web3store";
import useBalance from "../store/hooks/useBalance";

const Navbar = () => {
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const { account, disconnectWallet } = useWeb3Store();
  const balance = useBalance();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>Web3Onboard + Zustand</h1>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
      }}>
        {wallet && (
         <h4 style={{
          textAlign: "right",
         }}>
          <span>{account}</span>
          <br />
          <span>{balance} XDC</span>
         </h4>
        )}
        {!wallet && (
          <button className="comic-button" onClick={() => connect()}>
            Connect Wallet
          </button>
        )}
        {wallet && (
          <button
            className="comic-button"
            onClick={() => {
              console.log("disconnect", wallet?.label);
              if (wallet?.label) {
                disconnect({ label: wallet.label });
                disconnectWallet();
              }
            }}
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
