import { BrowserProvider, Contract, JsonRpcSigner, Network } from 'ethers';
import { ContractABI } from './abi';

export type ContractAddress = string;
export type ContractChainId = string;
export type ContractLoading = boolean;
export type ContractError = string | null;
export type ContractInstance = Contract | null;
export type EthersProvider = BrowserProvider | null;
export type EthersSigner = JsonRpcSigner | null | undefined;
export type EthereumAccount = string | null;
export type EthereumNetwork = Network | null | undefined;
export type IsConnected = boolean;
export type ConnectWalletFn = () => Promise<void>;
export type SwitchNetworkFn = (chainId: string) => Promise<void>;
export type DisconnectFn = () => void;

export interface ContractConfig {
  address: ContractAddress;
  abi: ContractABI;
  chainId?: ContractChainId;
}

export interface UseContractResult {
  provider: EthersProvider;
  signer: EthersSigner;
  account: EthereumAccount;
  network: EthereumNetwork;
  loading: ContractLoading;
  error: ContractError;
  isConnected: IsConnected;
  connectWallet?: ConnectWalletFn;
  switchNetwork?: SwitchNetworkFn;
  disconnect?: DisconnectFn;
}

// 常见网络ID映射
export const NETWORK_NAMES: Record<string, string> = {
  '0x1': 'Ethereum Mainnet',
  '0x5': 'Goerli Testnet',
  '0xaa36a7': 'Sepolia Testnet',
  '0x89': 'Polygon Mainnet',
  '0x13881': 'Mumbai Testnet',
  '0xa4b1': 'Arbitrum One',
  '0xa4ec': 'Celo Mainnet',
  '0x64': 'Gnosis Chain',
};

export interface SwitchNetworkResult {
  network?: EthereumNetwork;
  error?: ContractError;
}