// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import {Initializable} from  "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BoxV1 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    string private _name;

    event NameChanged(string newName);

    // 可升级合约不能使用构造函数，必须使用initialize
    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();

        _name = "Box V1";
    }

    function setName(string memory newName) public {
        _setName(newName);
    }

    function getName() public view returns (string memory) {
        string memory name = _getName();
        return name;
    }

    function _setName(string memory newName) internal {
        _name = newName;
        emit NameChanged(newName);
    }

    function _getName() internal view returns (string memory) {
        return _name;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

}