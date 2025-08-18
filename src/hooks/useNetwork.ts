import {
  ContractChainId,
  EthereumNetwork,
  EthersProvider,
  SwitchNetworkResult,
  NETWORK_NAMES,
} from './useContractTypes';

import { ERROR_ENUM } from '@/const/errorEnum';

export function useSwitchNetwork(
  chainId: ContractChainId,
  provider?: EthersProvider,
): Promise<SwitchNetworkResult> {
  var network: EthereumNetwork = null;

  return new Promise(async (reslove, reject) => {
    if (!window.ethereum) reject({ error: ERROR_ENUM.NOT_WINDOW_ETHEREUM });

    try {
      await window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });

      // 重新获取网络信息
      if (provider) {
        network = await provider.getNetwork();
      }

      reslove({ network });
    } catch (err) {
      console.error('网络切换失败:', err);

      // 如果链尚未添加到钱包，尝试添加它
      if ((err as { code: number }).code === 4902) {
        try {
          await window.ethereum?.request({
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
          reject({ error: ERROR_ENUM.NETWORK_ERROR });
        }
      } else {
        reject({
          error: `${ERROR_ENUM.NETWORK_ERROR}${
            err instanceof Error ? `:${err.message}` : ''
          }`,
        });
      }
    }
  });
}

export function useTransferChainTo10(chainId: ContractChainId): ContractChainId {
    return parseInt(chainId, 16).toString();
}
