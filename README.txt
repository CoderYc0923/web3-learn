1. 写合约时，先先声明版权

2. 选择Solidity的最新版本（因为最新版本一定是经过优化过的，对代码安全提示或者代码底层优化方面肯定也是优化过了的）

3. 导入我们需要的外部文件，如果是想要开发遵循EIP协议的合约，那么我们一定是要引用官方Openzeppelin开源的安全代码

4.开始编写我们的主要的合约逻辑

    4.1 编写合约代码的时候，如果我们有用到library库合约，我们就先使用using for 将我们需要的库引入进来

    4.2 然后我们在其后都声明一个写入数据到链上的事件（这样，我们想要用其它支持的编程语言与链交互的时候，就可以调用这个方法获取到这个事件返回给我们的更多的具体数据）

    4.3 在声明变量的时候，如果我们能用结构体我们就用结构体将变量在结构体来声明（需要注意的是，在声明变量的时候，我们要将同一种类型放在一起，因为这里面涉及到EVM底层的堆栈分配设计）

    4.4 声明的变量不能超过堆栈的限制，否则合约将不会被编译（补充一点，在Solidity语言中，uint和uint256是一样的。当我们声明了uint，其实就是uint256。一般来说，我们建议用uint来书写就可以了，因为即使我们写了uint8或者uint64等，EVM底层同样也会帮我们转换成uint256来处理）

    4.5 在结构体之后，我们再紧跟着声明数组和映射。就这样，保持我们的合约代码层次结构分明，同时更重要的是考虑到底层可以不用帮我们做数据类型的再次转换，这样我们可以使代码保持在比较好的堆栈分配，使我们部署合约的成本尽量减少，也使我们的合约更加安全

    4.6 然后，我们编写我们的初始化构造函数

    4.7 然后我们将写入方法和读取方法，以及一些不重要的方法依次写在合约

示例： example.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17; // 最新版本 0.8及以上
import  "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; // 官方Openzeppelin库合约
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Master is ERC721Enumerable, Ownable {
    // 首先将需要使用的代码库写在合约首位
    using Strings for uint256;

    // 事件
    event Write(string indexed data);

    // 变量
    adderss private _owner; // 声明私有变量，私有的通常用下划线
    address public manager;

    uint private _count;
    uint public score;

    string public color;
    string public weight;

    bool public isTure;

    // 将变量放在结构体
    struct Users {
        address account;
        uint64 beforeAmount;
        uint126 afterAmount;
        string info;
    }

    // 数组
    uint[] arr1;
    address[] arr2;

    // 映射
    mapping(uint => string) maps;
    mapping(uint => Users) userMaps;

    // 构造函数
    constructor() public {}

    // 写入方法
    function WriteLogic() external {
        _writeLogic();
    }

    // 读取方法
    function ReadLogic() external {}

    // 写入方法具体逻辑
    function _writeLogic() private {}

    // 其他不重要的方法
    function otherNotImportantFunction() internal {}
}


5. 此外，合约的可见性也需要清楚，分为private，internal，external和public

    5.1 在编写写入数据的方法时，我们建议使用external （因为这个相对于public来说安全一些，再一个也是节约部署合约成本的一个细节）

    5.2 在涉及到逻辑比较严谨的代码中，我们建议使用private函数，让我们的写入数据数据的方法直接去调用即可，例如上面代码中的_writeLogic方法

    5.3 这四个的区别是：
            private只能在本合约调用，
            internal可以在本合约和继承的合约调用，
            external只能在外部合约调用而本合约调用不了，
            public则没有限制，public的使用也是要小心谨慎，否则方法容易被黑客利用，造成不必要的损失

6. 在编写合约的时候，一定要使代码量越少越好，这里的代码量包含了引入的代码库

    6.1 代码量少，代码不至于太过复杂，安全性也会高 （当我们编写合约逻辑的时候，发现我们的代码量特别多，这时候就要小心谨慎的审阅我们的代码，包括不限于检查代码中的算术溢出或者转账等逻辑代码）

    6.2 以太坊部署合约，执行合约写入数据的方法都需要花费gas费，也就是需要花费ETH来作为交易的手续费

        这就要求我们在确保合约代码安全性的前提下，尽量的使我们的代码简洁，将需要上链的数据上链，将不必要的数据进行链下处理

        正确合理的引用官方的库合约代码，比如之前我们的NFT代码每次铸造都需要出发一次mint方法，每一次都需要消耗gas费，
        那么我们就用官方的ERC721Enumerable.sol这份合约，我们可以使用官方的ERC721A合约，这样，我们就可以实现批量铸造，一次性铸造多个NFT啦

    6.3 编写合约，就是要考虑代码的安全性，简洁性，节约部署成本。但是需要提醒一下的是，我们不能为了节省成本而节省成本

        安全性 》 成本




