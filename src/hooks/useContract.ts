import { ethers } from 'ethers';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ContractChainId,
  ContractConfig,
  ContractError,
  ContractInstance,
  ContractLoading,
  EthereumAccount,
  EthereumNetwork,
  EthersProvider,
  EthersSigner,
  NETWORK_NAMES,
  UseContractResult,
} from './useContractTypes';

export function useContract(config: ContractConfig): UseContractResult {
  const [contract, setContract] = useState<ContractInstance>(null);
  const [provider, setProvider] = useState<EthersProvider>(null);
  const [signer, setSigner] = useState<EthersSigner>(null);
  const [account, setAccount] = useState<EthereumAccount>(null);
  const [network, setNetwork] = useState<EthereumNetwork>(null);
  const [loading, setLoading] = useState<ContractLoading>(true);
  const [error, setError] = useState<ContractError>(null);

  // 使用 ref 存储最新值避免闭包问题
  const configRef = useRef(config);
  const accountRef = useRef(account);
  const providerRef = useRef(provider);

  useEffect(() => {
    configRef.current = config;
    accountRef.current = account;
    providerRef.current = provider;
  }, [config, account, provider]);

  //初始化以太坊提供程序
  const initProvider = useCallback(async (): Promise<EthersProvider> => {
    if (!window.ethereum) {
      throw new Error('未检测到以太坊钱包。请安装 MetaMask!');
    }

    const newProvider = new ethers.BrowserProvider(window.ethereum);
    setProvider(newProvider);
    return newProvider;
  }, []);

  //连接钱包
  const connectWallet = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const currentProvider = await initProvider();
      const accounts: EthereumAccount[] = await currentProvider?.send(
        'eth_requestAccounts',
        [],
      );

      if (accounts.length === 0) {
        throw new Error('未找到账户。用户可能拒绝了连接请求');
      }

      const signer = await currentProvider?.getSigner();
      const network = await currentProvider?.getNetwork();

      setAccount(accounts[0]);
      setSigner(signer);
      setNetwork(network);

      // 创建合约实例
      const contract = new ethers.Contract(
        configRef.current.address,
        configRef.current.abi,
        signer,
      );

      setContract(contract);
    } catch (err) {
      console.error('钱包连接失败:', err);
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  }, [initProvider]);

  //切换网络
  const switchNetwork = useCallback(
    async (chainId: ContractChainId) => {
      if (!window.ethereum) return;
      try {
        setLoading(true);

        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });

        // 重新获取网络信息
        if (provider) {
          const network = await provider.getNetwork();
          setNetwork(network);
        }
      } catch (err) {
        console.error('网络切换失败:', err);

        // 如果链尚未添加到钱包，尝试添加它
        if ((err as { code: number }).code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId,
                  chainName: NETWORK_NAMES[chainId] || `Chain ${chainId}`,
                  rpcUrls: ['https://rpc.example.com'],
                  nativeCurrency: {
                    name: 'ETH',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  blockExplorerUrls: ['https://explorer.example.com'],
                },
              ],
            });
          } catch (addError) {
            console.error('添加网络失败:', addError);
            setError('无法添加网络，请手动添加');
          }
        } else {
          setError(err instanceof Error ? err.message : '网络切换失败');
        }
      } finally {
        setLoading(false);
      }
    },
    [provider],
  );

  //断开连接
  const disconnect = useCallback(() => {
    setAccount(null);
    setContract(null);
    setSigner(null);
    setNetwork(null);
  }, []);

  //检查已有连接
  const checkExistingConnection = useCallback(async () => {
    try {
      if (!window.ethereum) {
        setLoading(false);
        return;
      }

      const currentProvider = await initProvider();
      const accounts: EthereumAccount[] = await currentProvider?.send(
        'eth_accounts',
        [],
      );

      if (accounts.length > 0) {
        const signer = await currentProvider?.getSigner();
        const network = await currentProvider?.getNetwork();

        setAccount(accounts[0]);
        setSigner(signer);
        setNetwork(network);

        // 创建合约实例
        const contract = new ethers.Contract(
          configRef.current.address,
          configRef.current.abi,
          signer,
        );

        setContract(contract);
      }
    } catch (err) {
      console.error('检查连接失败:', err);
    } finally {
      setLoading(false);
    }
  }, [initProvider]);

  // 处理账户变化
  const handleAccountsChanged = useCallback((accounts: EthereumAccount[]) => {
    if (accounts.length === 0) {
      // 用户断开连接
      disconnect();
    } else if (accounts[0] !== accountRef.current) {
      // 账户切换
      setAccount(accounts[0]);
      // 不需要重新创建合约实例，因为 signer 会自动更新
    }
  }, []);

  //监听网络变化
  const handleChainChanged = useCallback((chainId: ContractChainId) => {
    // 转换为十进制
    const newChainId = parseInt(chainId, 16).toString();
    console.log('网络已切换:', newChainId);

    // 重新获取网络信息
    if (providerRef.current) {
      providerRef.current.getNetwork().then((network) => {
        setNetwork(network);
      });
    }
  }, []);

  // 组件挂载时检查已有连接
  useEffect(() => {
    checkExistingConnection();

    // 添加事件监听器
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      // 清理事件监听器
      if (window.ethereum) {
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged,
        );
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [checkExistingConnection, handleAccountsChanged, handleChainChanged]);

  return {
    contract,
    provider,
    signer,
    account,
    network,
    loading,
    error,
    isConnected: !!account,
    connectWallet,
    switchNetwork,
    disconnect,
  };
}
