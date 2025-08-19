import { useState } from 'react';
import { UseContractResult } from '@/types/contract';

const defaultConfig = {
    provider: null,
    signer: null,
    account: null,
    network: null,
    loading: false,
    error: null,
    isConnected: false
}

const useWallet = () => {
  const [walletConfig, setWalletConfig] = useState<UseContractResult>(defaultConfig);
  return {
    walletConfig,
    setWalletConfig,
  };
};

export default useWallet;
