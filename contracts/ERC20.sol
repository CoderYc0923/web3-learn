// SPDX-License-Identifier: MIT

// 以太坊的ERC20代币均是用这种技术实现部署的，ERC20代币也叫做同质化代币
// 也就意味着所有人持有的代币是没有区别的，这就好比你手中的编号为001的100块人民币跟我手中编号为002的100块人民币的价值是一样的。

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/Context.sol";

// 导入了openzeppelin的标准代币接口（或者想要导入自己的合约文件）
// 想要使用导入进来的合约，直接使用is来继承

contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    //构造器需要传入两个参数，所以在部署合约前需要传入
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    //因为我们需要重写导入合约中的方法，所以函数跟着一个virtual和override关键字。

    // 读取代币名称
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    // 读取代币标识
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    // 读取代币精度
    //通常代币都会有精度，因为以太坊代币的数量是有单位的。
    //以太坊的最小单位位wei，之后是gwei，最大是ether。而1ether等于1000000000000000000wei，也就是1后面18个零。
    //那我们在设置decimal的时候，为了方便做代币的计算，我们通常将decimals设置为18。
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    // 读取代币的总数
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    // 读取某个账户的余额
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    // 转账方法。参数里的to代表的是对方的账户地址，amount代表的是需要转账的数量
    // 需要注意的是，区块链中，转账的数量默认单位是wei，所以，如果我们要转账1ether，就必须写成1后面跟18个零。
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    // 查询是spender账户还能在owner账户可以使用多少代币
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    // 当前执行这个方法的账户，允许spender账户可以从它的账户里使用多少代币
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    // 经过approve方法之后，spender就可以调用transferFrom方法，
    // 将from设置为给它ETH代币的账户地址，将to设置为需要转让的对方的地址，
    // 传入一个不大于6ETH的amount的值。这样，就可以将代币转出了。
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    // 增加允许spender从自己账户转出的代币的数量
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    // 减少允许spender从自己账户转出的代币的数量
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    // 转账逻辑实现的具体代码实现。它声明为internal，这就意味着只有内部合约才能够调用次方法，而外部合约则访问不到。

    // require限制条件中，我们限制发送者的账户地址和接受者的账户地址均不能为0地址，address(0)表示的是0x0地址，也就是黑洞地址，是一个无效的地址。
    // 当钱转入到此地址的时候，就意味着再也找不回来了。所以，这里为了用户转到黑洞地址，这里一开始就将参数进行了校验。

    // _beforeTokenTransfer方法是转账前的状态。

    // require(fromBalance >= amount)，表示发送者的数量要大于填入的amount的值。

    // unchecked方法不检查算术的溢出

    // 由于我们这个方法是重写的方法，而导入的文件里已经有了Transfer这个event事件，所以我们可以使用emit监听事件。

    // 最后使用_afterTokenTransfer方法来更新是转账后的状态。

    function _transfer(address from, address to, uint256 amount) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
            _balances[to] += amount;
        }

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

    // 铸造代币的方法
    // 前面代码中声明了一个_totalSupply代表代币总量的变量，以及_balances这个映射
    // 当我们执行这个方法的逻辑的时候，总量会增加，并且给参数account增加的数量也会对应增加。
    // 这个方法是internal的，所以，我们不能直接使用，只能在写一个公共的方法来去调用这个方法实现接口。
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        unchecked {
            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
            _balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    // 将_totalSupply进行减法的操作
    // 当执行这个方法的逻辑时，参数account的amount就会随之减少。
    // 同样，它是internal方法，所以，如果我们的需求里有销毁代币的功能，我们也是一样要写一个公共的方法来调用_burn这个接口。
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
            // Overflow not possible: amount <= accountBalance <= totalSupply.
            _totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _spendAllowance(address owner, address spender, uint256 amount) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual {}

    function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual {}
}


contract MyToken is ERC20 {

    address public owner;

    // 在构造器里，我们继承了ERC20合约的构造器的接口。
    // 在合约部署之前，我们就将部署合约的用户地址赋予owner，并且初始化铸造出100ETH的代币。
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        owner = msg.sender;

        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }

    // 要求owner的账户地址必须是部署合约的账户地址。
    modifier Manager {
        require(owner == msg.sender,"NOT OWNER!");
        _;
    }

    function mint(uint amount) external Manager {
        _mint(msg.sender, amount * 10 ** uint(decimals()));
    }
}