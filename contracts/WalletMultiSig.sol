pragma solidity >=0.4.21 <8.10.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract MultiSig {
    event Desposit(address indexed sender, uint256 amount, uint256 balance);
    event TransactionSubmit(
        address indexed owner,
        uint256 transactionIndex,
        address to,
        uint256 value
    );
    event ConfirmationRevoke(address indexed sender, uint256 transactionIndex);
    event ConfirmeTransaction(address indexed sender, uint256 transactionIndex);
    event WithdrawFunds(address to, uint256 value);

    mapping(address => bool) public isOwner;
    mapping(uint256 => mapping(address => bool)) public isConfirmed;
    mapping(address => uint256) lastTimeValided;
    mapping(address => bool) withdrawConfirm;
    uint256 public numConfirmationsRequired;

    address[] public owners;
    bool public canBeAlone;

    struct Transaction {
        address to;
        uint256 value;
        bool executed;
        uint256 numConfirmations;
    }

    Transaction[] public transactions;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier transactionExists(uint256 transactionIndex) {
        require(transactionIndex < transactions.length, "tx does not exist");
        _;
    }

    modifier notExecuted(uint256 transactionIndex) {
        require(
            !transactions[transactionIndex].executed,
            "tx already executed"
        );
        _;
    }

    constructor(address[] memory _owners, uint256 _numConfirmationsRequired) {
        require(_owners.length > 0, "owners required");
        require(
            _numConfirmationsRequired > 0 &&
                _numConfirmationsRequired <= _owners.length,
            "invalid number of required confirmations"
        );

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            lastTimeValided[_owners[i]] = block.timestamp;
            isOwner[owner] = true;
            owners.push(owner);
        }

        numConfirmationsRequired = _numConfirmationsRequired;
    }

    receive() external payable {
        emit Desposit(msg.sender, msg.value, address(this).balance);
    }

    function SubmitTransaction(address _to, uint256 _value) public onlyOwner {
        uint256 transactionIndex = transactions.length;

        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                executed: false,
                numConfirmations: 0
            })
        );

        emit TransactionSubmit(msg.sender, transactionIndex, _to, _value);
    }

    function confirmTransaction(uint256 transactionIndex)
        public
        onlyOwner
        transactionExists(transactionIndex)
        notExecuted(transactionIndex)
    {
        Transaction storage transaction = transactions[transactionIndex];
        transaction.numConfirmations += 1;
        isConfirmed[transactionIndex][msg.sender] = true;

        emit ConfirmeTransaction(msg.sender, transactionIndex);
    }

    function confirmWithdraw() public onlyOwner {
        withdrawConfirm[msg.sender] = true;
    }

    function executeTransaction(uint256 transactionIndex)
        public
        onlyOwner
        transactionExists(transactionIndex)
        notExecuted(transactionIndex)
    {
        Transaction storage transaction = transactions[transactionIndex];

        verifyValidateTime();
        if (canBeAlone) {
            (bool success, ) = transaction.to.call{value: transaction.value}(
                ""
            );
            require(success, "transaction failed");
            transactions[transactionIndex].executed = true;
        } else {
            if (transaction.numConfirmations >= numConfirmationsRequired) {
                transaction.executed = true;
                (bool success, ) = transaction.to.call{
                    value: transaction.value
                }("");
                require(success, "transaction failed");
                transactions[transactionIndex].executed = true;
            } else {
                revert();
            }
        }
    }

    function revokeConfirmation(uint256 transactionIndex)
        public
        onlyOwner
        transactionExists(transactionIndex)
        notExecuted(transactionIndex)
    {
        Transaction storage transaction = transactions[transactionIndex];

        require(
            isConfirmed[transactionIndex][msg.sender],
            "transaction not confirmed"
        );

        transaction.numConfirmations -= 1;
        isConfirmed[transactionIndex][msg.sender] = false;

        emit ConfirmationRevoke(msg.sender, transactionIndex);
    }

    function getTransaction(uint256 transactionIndex)
        public
        view
        returns (
            address to,
            uint256 value,
            bool executed,
            uint256 numConfirmations
        )
    {
        Transaction storage transaction = transactions[transactionIndex];

        return (
            transaction.to,
            transaction.value,
            transaction.executed,
            transaction.numConfirmations
        );
    }

    function resetValidateTime() public onlyOwner {
        lastTimeValided[msg.sender] = block.timestamp;
    }

    function verifyValidateTime() internal {
        for (uint256 index = 0; index < owners.length; index++) {
            if (lastTimeValided[owners[index]] > 30 days) {
                canBeAlone = true;
            }
        }
    }

    //Peut être utiliser payement splitter, car ici les fonds vont être envoyé à 1 seule addresse
    function widthdrawMultisig() public onlyOwner {
        verifyValidateTime();
        uint256 balance = address(this).balance;
        if (canBeAlone) {
            (bool succcess, ) = msg.sender.call{value: balance}("");
            require(succcess, "Withdraw failed");
            emit WithdrawFunds(msg.sender, balance);
        } else {
            if (verifiyConfirm()) {
                (bool succcess, ) = msg.sender.call{value: balance}("");
                require(succcess, "Withdraw failed");
                resetConfirm();
                emit WithdrawFunds(msg.sender, balance);
            } else {
                revert();
            }
        }
    }

    function verifiyConfirm() internal view returns (bool) {
        uint256 count = 0;
        for (uint256 i = 0; i < owners.length; i++) {
            if (withdrawConfirm[owners[i]] == true) count++;
            if (count == 2) return true;
        }
    }

    function resetConfirm() internal {
        for (uint256 i = 0; i < owners.length; i++) {
            withdrawConfirm[owners[i]] = false;
        }
    }
}

contract WithdrawMoney {
    mapping(address => bool) public isOwner;

    address[] public owners;

    address[] private teams = [
        0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,
        0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,
        0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
    ];

    uint256[] share = [45, 45, 10];

    // il est possible de définir share et teams dans le contructor si on ne veut pas l'écrire en dur dans le code

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    // constructor() PaymentSplitter(teams, share) {}
}
