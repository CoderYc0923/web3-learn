import '@umijs/max/typings';
// 扩展 Window 接口以包含 ethereum 属性
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider & {
      // 一些钱包可能不是完全兼容 EIP-1193 规范
      // 添加一些常见的非标准属性
      isMetaMask?: boolean;
      isConnected?: () => boolean;
      autoRefreshOnNetworkChange?: boolean;
      request?: (...args: any[]) => Promise<any>;
      on?: (event: string, callback: (...args: any[]) => void) => void;
      removeListener?: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}
