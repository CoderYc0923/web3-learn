export interface ABIParameter {
  name: string;
  type: string;
  internalType?: string;
  components?: ABIParameter[];
  indexed?: boolean;
}

export interface FunctionABI {
  type: 'function';
  name: string;
  inputs: ABIParameter[];
  outputs: ABIParameter[];
  stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable';
  constant?: boolean;
  payable?: boolean;
}

export interface EventABI {
  type: 'event';
  name: string;
  inputs: ABIParameter[];
  anonymous: boolean;
}

export interface ConstructorABI {
  type: 'constructor';
  inputs: ABIParameter[];
  stateMutability: 'nonpayable' | 'payable';
  payable?: boolean;
}

export interface FallbackABI {
  type: 'fallback';
  stateMutability: 'nonpayable' | 'payable';
  payable?: boolean;
}

export interface ReceiveABI {
  type: 'receive';
  stateMutability: 'payable';
  payable?: boolean;
}

export interface ErrorABI {
  type: 'error';
  name: string;
  inputs: ABIParameter[];
}

export type GenerateABIConfigType =
  | FunctionABI
  | EventABI
  | ErrorABI;

export type ABIConfigType =
  | FunctionABI
  | EventABI
  | ConstructorABI
  | FallbackABI
  | ReceiveABI
  | ErrorABI;

export type ContractABI = Array<ABIConfigType>;
