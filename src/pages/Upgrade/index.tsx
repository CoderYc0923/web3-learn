import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contracts/helloworld';
import { ContractConfig } from '@/types/contract';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Descriptions } from 'antd';

import styles from './index.less'

const CONTRACT_CONFIG: ContractConfig = {
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
};

const UpgradePage: React.FC = () => {
  const { walletConfig, setWalletConfig } = useModel('wallet');

  console.log('UpgradePage', walletConfig);

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

      <div className={styles.tools}>

      </div>
    </PageContainer>
  );
};

export default UpgradePage;
