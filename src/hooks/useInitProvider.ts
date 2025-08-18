import { ethers } from 'ethers';

import { ERROR_ENUM } from '@/const/errorEnum';

/**
 *  初始化以太坊提供程序
 */
export function useInitProvider() {
  if (!window.ethereum) {
    throw new Error(ERROR_ENUM.NOT_WINDOW_ETHEREUM);
  }

  const newProvider = new ethers.BrowserProvider(window.ethereum);

  console.info('初始化以太坊提供程序成功')

  return newProvider;
}
