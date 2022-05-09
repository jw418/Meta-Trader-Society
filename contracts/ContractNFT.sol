pragma solidity >=0.4.21 <8.10.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PayementSpliter.sol";

contract RatRaceNFT is ERC721Enumerable, PaymentSplitter {
    uint256 public constant max_supply = 3333;
    uint256 public max_mint_allowed = 3;
    uint256 public priceSale = 1 ether;
    bool mintOpen = true;

    address[] private teams = [
        0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,
        0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,
        0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
    ];

    uint256[] share = [45, 45, 10];

    string public baseURI;

    mapping(address => uint256) nftBalance;

    constructor()
        public
        ERC721("RatRace", "RAT")
        PaymentSplitter(teams, share)
    {}

    function mint(uint256 amount) external payable {
        uint256 numberNftSold = totalSupply();

        require(msg.value >= priceSale * amount, "Not enought found");
        require(amount <= max_mint_allowed, "You can mint more nft");
        require(
            nftBalance[msg.sender] + amount < max_mint_allowed,
            "To much mint"
        );
        require(mintOpen, "mint phase is ended");

        if (numberNftSold + amount == max_supply) {
            mintOpen = false;
        }

        nftBalance[msg.sender] += amount;
        for (uint256 i = 1; i <= amount; i++) {
            _safeMint(msg.sender, numberNftSold + i);
        }
    }

    // function setBaseUri(string memory _newBaseURI) external onlyOwner {
    //     baseURI = _newBaseURI;
    // }
}
