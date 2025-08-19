import { ContractABI, GenerateABIConfigType } from '@/types/abi';
import { Button, Input } from 'antd';
import React from 'react';
import styles from './index.less';

interface Props {
  contractABI: ContractABI;
}

const GenerateToolsItem: React.FC<{ abi: GenerateABIConfigType }> = (props) => {
  const { abi } = props;

  return (
    <div className={styles.tools_item}>
      <Button>{abi.name}</Button>
      {abi.inputs.length &&
        abi.inputs.map((input) => (
          <Input placeholder={`${input.type} ${input.name}`} />
        ))}
    </div>
  );
};

const GenerateTools: React.FC<Props> = (props) => {
  const { contractABI } = props;

  return (
    <div className={styles.tools}>
      {contractABI.length &&
        contractABI
          .filter((abi) => abi.type === 'function')
          .map((abi) => {
            return <GenerateToolsItem abi={abi} />;
          })}
    </div>
  );
};

export default GenerateTools;
