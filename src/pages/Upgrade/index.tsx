import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contracts/helloworld';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { ContractConfig } from '@/hooks/useContractTypes';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Descriptions } from 'antd';
import { useModel } from '@umijs/max';

const CONTRACT_CONFIG: ContractConfig = {
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
};

const UpgradePage: React.FC = () => {

  const { walletConfig, setWalletConfig } = useModel('wallet');

  console.log('UpgradePage', walletConfig);
  

  return (
    <PageContainer ghost>

    </PageContainer>
  );
};

export default UpgradePage;
