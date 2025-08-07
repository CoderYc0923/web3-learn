### 学习路径规划（分 5 个阶段）



#### **阶段 1：Web3 基础认知（1-2 周）**

目标：建立对 Web3、区块链的底层理解，明确技术栈与前端的关联。
核心技能：



- 区块链核心概念：去中心化、分布式账本、区块结构、地址 / 私钥 / 公钥、Gas 机制、共识机制（PoW/PoS）。
- Web3 生态基础：公链（以太坊、Polygon 等）、DApp（去中心化应用）、钱包（MetaMask）、代币（ERC-20/ERC-721）。
- 前端视角的 Web3：DApp 与传统 Web App 的区别（数据存储在链上 / 去中心化存储，用户通过钱包交互而非账号密码）。



#### **阶段 2：Web3 前端开发（2-3 周）**

目标：将现有前端技能迁移到 Web3 场景，掌握 DApp 前端开发工具链。
核心技能：



- 区块链交互库：
  - Ethers.js（主流，轻量，推荐优先学）：与区块链节点通信、调用智能合约、处理钱包签名。
  - Web3.js（老牌，功能类似，了解即可）。
- 钱包集成：
  - MetaMask 交互：连接钱包（window.ethereum）、获取账户地址、请求签名、监听链切换。
  - WalletConnect：跨钱包协议（支持多钱包，如 Coinbase Wallet、Trust Wallet）。
- 前端框架结合：
  - React+Web3：用 useEffect 管理钱包连接状态，用状态管理（Redux/Zustand）存储链上数据。
  - Vue+Web3：封装钱包连接组件，处理合约调用的异步逻辑。
- 链上数据查询：
  - 区块浏览器 API（Etherscan API）：查询交易、余额、合约 ABI。
  - The Graph（去中心化数据索引）：高效查询复杂链上数据（如 DeFi 的流动性、NFT 持仓）。



#### **阶段 3：智能合约开发（4-6 周）**

目标：掌握 Web3 “后端” 核心 —— 智能合约的编写、测试、部署，理解链上逻辑。
核心技能：



- 合约语言：Solidity（以太坊生态主流，语法类似 JavaScript，重点学）。
- 核心语法：
  - 数据类型（uint/address/string、映射 mapping、数组 array）。
  - 函数（可见性 public/external/private/internal、修饰器 modifier）。
  - 状态管理（storage/memory/calldata）、事件（event）、异常处理（require/revert）。
- 开发工具：
  - 编译与部署：Hardhat（推荐，功能全，支持 TypeScript）、Truffle（老牌，生态成熟）。
  - 在线 IDE：Remix（快速调试，适合入门）。
  - 测试框架：Chai+Mocha（Hardhat 内置，编写合约单元测试）。
- 标准合约与库：
  - OpenZeppelin（安全合约库，直接复用 ERC-20/ERC-721、权限管理 Ownable 等）。
  - 常见模式：代理模式（升级合约）、闪电贷、NFT 铸造逻辑。



#### **阶段 4：全栈集成与后端服务（2-3 周）**

目标：连接前端与智能合约，补充链下服务能力，实现完整 DApp 流程。
核心技能：



- 全栈流程：
  - 前端调用合约：通过 Ethers.js 传入合约 ABI + 地址，调用函数（read 函数免费，write 函数需支付 Gas）。
  - 后端服务（可选，链下辅助）：
    - Node.js+Express：搭建链下 API（处理链上无法存储的高频数据，如用户行为日志）。
    - 去中心化存储：IPFS（存储 NFT 元数据、大文件）+Pinata（IPFS 管理工具）。
- 数据库：
  - 链下数据库：MongoDB（存储用户链下数据，如偏好设置）。
  - 链上数据同步：用 The Graph Subgraph 将链上数据索引到数据库，供前端高效查询。



#### **阶段 5：进阶与生态实战（持续学习）**

目标：深入 Web3 场景，掌握复杂 DApp 开发，了解安全与优化。
核心技能：



- 高级场景开发：
  - DeFi：swap（Uniswap-like）、借贷（Aave-like）的前端 + 合约逻辑。
  - NFT：铸造、拍卖、质押的全流程实现。
  - DAO：投票合约（Snapshot）与前端交互。
- 安全与审计：
  - 常见漏洞：重入攻击、整数溢出、权限管理问题（用 Slither 工具静态分析）。
  - 合约优化：降低 Gas 消耗（精简存储、批量操作）。
- 多链适配：
  - 跨链开发：适配以太坊、Polygon、BSC 等（处理不同链的 Gas、区块确认时间差异）。
  - Layer2：Optimism/Arbitrum（了解 Rollup 机制，适配低成本交易场景）。
- 实战项目：
  - 仿写小项目：ERC-20 代币 + 前端转账页面、简单 NFT mint 网站、DAO 投票工具。
  - 参与开源：贡献 OpenZeppelin、Ethers.js 生态，或开发 DApp 提交到 Chainlink Hackathon 等赛事。