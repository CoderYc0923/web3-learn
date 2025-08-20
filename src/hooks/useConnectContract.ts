import { ethers } from 'ethers';

const contractMap = new Map();

/**
 * 连接合约
 */

export function useConnectContractProvider(config: any) {
  const { address, abi, provider } = config;

  if (!address || !abi?.length || !provider) return new Error('参数不能为空');

  let contract;

  contract = new ethers.Contract(address, abi, provider);

  /* if (!contractMap.has(address)) {
        contract = new ethers.Contract(address, abi, provider)
        if (signer) contract.coonnect(signer)
        contractMap.set(address, contract)
    } else {
        contract = contractMap.get(address)
    } */

  return contract;
}

export function useConnectContractSigner(config: any) {
    const { address, abi, signer } = config;
  
    if (!address || !abi?.length || !signer) return new Error('参数不能为空');
  
    let contract;
  
    contract = new ethers.Contract(address, abi, signer);
  
    /* if (!contractMap.has(address)) {
          contract = new ethers.Contract(address, abi, provider)
          if (signer) contract.coonnect(signer)
          contractMap.set(address, contract)
      } else {
          contract = contractMap.get(address)
      } */
  
    return contract;
  }
