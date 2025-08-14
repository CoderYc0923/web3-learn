// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/ABITest_Storage.sol";

// 先部署StorageContract合约，记录下部署后的合约地址
// 然后部署CallerContract合约，在部署时传入StorageContract的合约地址，这样CallerContract就可以与StorageContract建立连接。​
// 当我们想要调用CallerContract的callSetValue函数时，实际上是间接调用了StorageContract的setValue函数。
// 通过CallerContract的实例，传入要存储的值，比如callSetValue(10)，就会将值 10 存储到StorageContract的storedValue变量中。​
// 当调用callGetValue函数时，会从StorageContract中读取storedValue的值并返回。​
// 通过这个实战案例，我们可以清晰地看到如何通过 ABI 接口在不同合约之间进行函数调用，实现数据的存储和读取等操作 。

contract CallerContract {
    StorageContract storageContract;

    constructor(address _storageContractAddress) {
        storageContract = StorageContract(_storageContractAddress);
    }

    function callSetValue(uint _value) public {
        storageContract.setValue(_value);
    }

    function callGetValue() public view returns (uint) {
        return storageContract.getValue();
    }
}