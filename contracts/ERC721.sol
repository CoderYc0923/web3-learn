// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/utils/Strings.sol';

contract MyNFT is ERC721Enumerable, Ownable {
    //由于Counter.sol是一个library库合约，所以这里要使用using来使用这个库合约。
    //具体的使用方式是 using 库函数（来自库A）附加到任何类型（B）。
    //在下面的代码中，我们会用到这个uint类型的tokenId转换成string类型，所以，我们还得使用 using Strings for uint256 这个方法。
    //_tokenIdTracker变量直接使用库合约的Counter方法来做其类型声明。
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdTracker;

    //我们声明了一个Mint事件，在执行mint方法的时候，可以返回具体的数据信息。注意的是这里使用了indexed，意思是过滤的意思。
    event Mint(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    //这里我们声明当前的tokenId到角标是从0开始。
    uint256 private _currentTokenId = 0;

    // 每个NFT都是一张图片，又或者是视频。那么这些图片或者视频是不会通过合约放在链上来存储的。
    // 考虑到数据存储在链上是需要消耗gas费，是需要成本的，因此，我们通常将这些图片或者视频的数据放在链下来存储。
    // 而通常我们的存储方式是借助现有的分布式存储工具ipfs或者pinata，又或者是其它的分布式存储工具。
    // 这里使用的是ipfs分布式存储。
    // 在ipfs中，我预先将所有的图片存储在ipfs文件夹中，然后按照尾缀 .json 的格式存储。在命名上按照阿拉伯数字1开始依次递增命名。
    // 通常我们的做法是在代码的逻辑中让我们的tokenId从1开始计数，而不从0开始，这在合约部署成本上是有考虑的，从1开始计数会使得我们的合约部署成本可以减少些。
    // 在 .json 文件中，我们可以存储我们自己想要存储的元数据内容。元数据，也就是NFT的一些属性信息。
    // 比如我们的NFT是加密朋克类型的，那么我们的 .json 文件的元数据内容可以是关于这类型加密朋克NFT的长相，性别，以及微小外貌细节上的区别，以及图片的路径等。
    string private constant _baseTokenURI =
        "https://ipfs.io/ipfs/QmXgMRpwoEtuhksEJ7LD9ySLzAvAM5tqs1q6rGZ38Qg1Kf/";
    string public baseExtension = ".json";

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {
        require(
            bytes(name).length != 0 && bytes(symbol).length != 0,
            "name and symbol can't be empty"
        );
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    _baseTokenURI,
                    tokenId.toString(),
                    baseExtension
                )
            );
    }

    function mint() external {
        // tokenId从1开始计数
        uint256 _tokenId = _tokenIdTracker.current() + 1;
        _mint(msg.sender, _tokenId);
        _tokenIdTracker.increment();

        emit Mint(address(0), msg.sender, _tokenId);
    }
}
