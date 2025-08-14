// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageContract {
    uint storedValue;

    function setValue(uint _value) public {
        storedValue = _value;
    }

    function getValue() public view returns (uint) {
        return storedValue;
    }
}

