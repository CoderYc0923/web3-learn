// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// staticcall函数
// 以静态（只读）方式调用其他合约的函数 。它的最大特点就是不允许修改状态

contract Token {
    mapping(address => uint) public balances;

    function getBalance(address account) public view returns (uint) {
        return balances[account];
    }
}

contract Caller {
    function checkBalance(address tokenContract, address account) public view returns (uint) {
        bytes memory data = abi.encodeWithSignature("getBalance(address account)", account);
        
        (bool success, bytes memory result) = tokenContract.staticcall(data);
        require(success, "Staticcall failed");

        return abi.decode(result, (uint));
    }
}