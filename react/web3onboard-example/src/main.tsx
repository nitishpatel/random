import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Web3OnboardProvider } from "@web3-onboard/react";
import web3Onboard from "./helper/web3-onboard.ts";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <App />
      </Web3OnboardProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
