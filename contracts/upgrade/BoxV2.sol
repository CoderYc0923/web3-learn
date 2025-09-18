// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import {Initializable} from  "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BoxV2 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 _count;
    string _name;

    event CountChanged(uint256 count);

    // 可升级合约不能使用构造函数，必须使用initialize
    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        
        _name = "Box V2";
        _count = 2;
    }

    function getName() public view returns (string memory) {
        string memory name = _getName();
        return name;
    }

    function getCount() public view returns (uint256) {
        uint256 count = _getCount();
        return count;
    }

    function _getName() internal view returns (string memory) {
        return _name;
    }

    function _getCount() internal view returns (uint256) {
        return _count;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

}