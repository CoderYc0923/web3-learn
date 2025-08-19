import Guide from '@/components/Guide';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Descriptions } from 'antd';
import { useEffect } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const { walletConfig, setWalletConfig } = useModel('wallet');

  const connectWalletConfig = useConnectWallet();

  useEffect(() => {
    setWalletConfig(connectWalletConfig);
  }, [walletConfig, connectWalletConfig, setWalletConfig]);

  const {
    account,
    network,
    signer,
    isConnected,
    loading: walletLoading,
    error: walletError,
    connectWallet,
    switchNetwork,
    disconnect,
  } = walletConfig;

  const handleConnect = () => {
    if (isConnected) {
      disconnect?.();
    }

    connectWallet?.();
  };

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />

        <div className={styles.btn}>
          <Button type="primary" onClick={handleConnect}>
            {isConnected
              ? '连接成功（重新连接）'
              : walletLoading
              ? '连接中...'
              : '开始连接钱包'}
          </Button>
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
