import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Web3OnboardProvider } from '@web3-onboard/react'
import web3Onboard from './helper/web3-onboard.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <Web3OnboardProvider web3Onboard={web3Onboard}>
      <App />
    </Web3OnboardProvider>
  </React.StrictMode>,
)
