// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// call函数例子

// 定义被调用合约
 contract testContract {
    uint value;

    function setValue(uint _value) public {
        value = _value;
    }
 }

contract caller {
    function callSetValue(address contractAddress) external returns (bool, bytes memory) {
        // 对函数签名和参数进行编码
        bytes memory data = abi.encodeWithSignature("setValue(uint _value)", 8);

        // 仅调用外部合约的函数
        return contractAddress.call(data);

        // 调用外部合约的函数且转给他eth
        // return contractAddress.call{value: 0.5 ether}(data);

        // 仅转给调用外部合约eth
        // return contractAddress.call{value: 0.5 ether}("");
    }  
}