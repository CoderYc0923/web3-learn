// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 创建一个外部合约用来执行事件

contract OnlyEven {
    constructor(uint a) {
        require(a != 0, "invalid number");
        assert(a != 1);
    }

    function onlyEven(uint256 b) external pure returns(bool success) {
        // 输入奇数时revert
        require(b % 2 == 0, "Ups! Reverting");
        success = true;
    }
}

