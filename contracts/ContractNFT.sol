pragma solidity >=0.4.21 <8.10.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract RatRaceNFT is ERC721Enumerable {
    uint256 public constant max_supply = 3333;
    uint256 public max_mint_allowed = 3;
    uint256 public priceSale = 1 ether;
    bool mintOpen = true;

    string public baseURI;

    mapping(address => uint256) nftBalance;

    constructor() public ERC721("RatRace", "RAT") {}

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
}
