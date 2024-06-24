import { useEffect } from 'react';
import { useWeb3Store } from '../web3store';
import { useQuery } from 'react-query';

const useBalance = () => {
  // Get the fetchBalance function from the store
  const fetchBalance = useWeb3Store((state) => state.pollBalance);

  // Get the current balance from the store
  const { balance } = useWeb3Store();

  // Setup react-query to fetch the balance periodically
  const query = useQuery('balance', fetchBalance, {
    refetchInterval: 5000,
    enabled: !!fetchBalance,
  });

  // Return the queried balance or the balance from the store
  return query.data || balance;
};

export default useBalance;
