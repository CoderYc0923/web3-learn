// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// delegatecall函数
// 实现合约间的函数调用,且作用域在被调用函数中
// delegatecall函数在实际项目中最常见的应用场景就是合约升级

contract OldCounter {
    uint count;
    
    function increment() public {
        count++;
    }

    function getCount() public view returns (uint) {
        return count;
    }
}

// 为了升级合约，改造原合约
contract NewCounter {
    address upgradeContract;

    constructor(address _upgradeContract) {
        upgradeContract = _upgradeContract;
    }

    fallback() external payable {
        (bool success, bytes memory data) = upgradeContract.delegatecall(msg.data);
        require(success, "Delegatecall failed");
        // 内联编汇
        assembly {
            return(add(data, 32), mload(data))
        }
    }
}