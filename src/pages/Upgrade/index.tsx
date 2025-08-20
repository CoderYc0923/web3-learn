import {
  BOX_PROXY_ABI_TRASNFORM,
  BOX_PROXY_ADDRESS,
} from '@/contracts/upgrade/Proxy';
import { ContractInstance } from '@/types/contract';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Descriptions } from 'antd';

import { useEffect, useState } from 'react';
import styles from './index.less';

import { BOX_V2_ADDRESS } from '@/contracts/upgrade/BoxV2';
import {
  useConnectContractProvider,
  useConnectContractSigner,
} from '@/hooks/useConnectContract';
import { ethers } from 'ethers';

const UpgradePage: React.FC = () => {
  const { walletConfig, setWalletConfig } = useModel('wallet');

  const [providerContract, setProviderContract] =
    useState<ContractInstance>(null);
  const [signerContract, setSignerContract] = useState<ContractInstance>(null);

  console.log('UpgradePage', walletConfig);

  console.log(BOX_PROXY_ABI_TRASNFORM);

  const init = async () => {
    const config = {
      address: BOX_PROXY_ADDRESS,
      abi: BOX_PROXY_ABI_TRASNFORM,
    };

    const providerContract: any = useConnectContractProvider({
      ...config,
      provider: walletConfig.provider,
    });
    setProviderContract(providerContract);

    const signerContract: any = useConnectContractSigner({
      ...config,
      signer: walletConfig.signer,
    });

    //contract.on("Initialized", (version: any) => console.log('version', version))

    console.log('providerContract', providerContract);
    console.log('signerContract', signerContract);

    const name1 = await providerContract?.getName();
    const name2 = await signerContract?.getName();

    console.log('name', name1, name2);

    signerContract.on('Upgraded', (implementation: any) =>
      console.log('implementation', implementation),
    );

    const initializeABI = ['function initialize()'];
    const iface = new ethers.Interface(initializeABI);
    const initData = iface.encodeFunctionData('initialize');

    const tx = await signerContract?.upgradeToAndCall(
      BOX_V2_ADDRESS,
      initData,
      {
        gasLimit: 500000,
      },
    );
    console.log('tx', tx);

    const receipt = await tx.wait();
    console.log('receipt', receipt);

    const name3 = await signerContract?.getName();
    console.log('upgrade name', name3);
  };

  useEffect(() => {
    init();

    return () => {
      providerContract && providerContract.removeAllListeners();
    };
  }, []);

  return (
    <PageContainer ghost>
      <Descriptions bordered title="当前合约信息">
        <Descriptions.Item label="address" span={3}>
          address
        </Descriptions.Item>
        <Descriptions.Item label="abi" span={3}>
          abi
        </Descriptions.Item>
      </Descriptions>

      <div className={styles.tools}></div>
    </PageContainer>
  );
};

export default UpgradePage;
