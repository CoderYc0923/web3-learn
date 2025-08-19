import { ContractABI } from '@/types/abi';

export function useFilterFunctionABI (contractABI: ContractABI, ABINames: string[]) {
    const filterABI: ContractABI = []

    for (let abi of contractABI) {
        if (abi.type === 'function' &&  ABINames.includes(abi.name)) filterABI.push(abi)
    }

    return filterABI;
}