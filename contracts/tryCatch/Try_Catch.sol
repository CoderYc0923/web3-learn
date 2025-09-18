// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/tryCatch/OnlyEven.sol";

contract TryCatch {
    // 成功event
    event SuccessEvent();

    // 失败event
    event CatchEvent(string message);
    event CatchByte(bytes data);

    OnlyEven even;

    constructor() {
        even = new OnlyEven(2);
    }

    function execute(uint amount) external returns(bool success) {
        try even.onlyEven(amount) returns(bool _success) {
            emit SuccessEvent();
            return _success;
        } catch Error(string memory reason) {
            emit CatchEvent(reason);
        }
    }

    // 创建合约时的异常
    function executeNew(uint a) external returns(bool success) {
        try new OnlyEven(a) returns(OnlyEven _even) {
            emit SuccessEvent();
            success = _even.onlyEven(a);
        } catch Error(string memory reason) {
            emit CatchEvent(reason);
        } catch (bytes memory reason) {
            emit CatchByte(reason);
        }
    }

}

