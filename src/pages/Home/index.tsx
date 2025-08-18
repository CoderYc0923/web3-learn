import Guide from '@/components/Guide';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contracts/helloworld';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { ContractConfig } from '@/hooks/useContractTypes';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Descriptions } from 'antd';
import styles from './index.less';

const CONTRACT_CONFIG: ContractConfig = {
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
};

const HomePage: React.FC = () => {
  const { name } = useModel('global');

  const {
    account,
    network,
    signer,
    isConnected,
    loading: walletLoading,
    error: walletError,
    connectWallet,
    switchNetwork,
  } = useConnectWallet();

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />

        <div className={styles.btn}>
          {isConnected ? (
            <h3>连接成功</h3>
          ) : (
            <Button type="primary" onClick={connectWallet}>
              {walletLoading ? '连接中...' : '开始连接钱包'}
            </Button>
          )}
        </div>

        <div className={styles.config}>
          {isConnected ? (
            <Descriptions bordered>
              <Descriptions.Item label="account" span={3}>
                {account}
              </Descriptions.Item>
              <Descriptions.Item label="network" span={3}>
                {network && network.name}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            '暂无信息'
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
