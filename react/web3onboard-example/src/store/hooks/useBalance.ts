import { useEffect } from 'react';
import { useWeb3Store } from '../web3store';

const useBalance = () => {
  const fetchBalance = useWeb3Store((state) => state.pollBalance);
  const {balance} = useWeb3Store();

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBalance();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [fetchBalance]);

  return balance;
};

export default useBalance;
