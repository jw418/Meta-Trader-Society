// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <8.10.0;

/// @title Contract RatRaceNFt
/// @author Julien Wolff Tristan Boettger

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PayementSpliter.sol";

contract RatRaceNFT is ERC721Enumerable, PaymentSplitter, Ownable {
    using Strings for uint256;

    uint256 public constant max_supply = 3333;

    uint256 public max_mint_allowed = 3;

    uint256 public priceSale = 1 ether;

    bool public mintOpen = true;

    string public baseExtension = ".json";

    address[] private _teams = [
        0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,
        0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,
        0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
    ];

    uint256[] private _share = [45, 45, 10];

    string public baseURI;

    mapping(address => uint256) public nftBalance;

    constructor(string memory _newBaseURI)
        public
        ERC721("RatRace", "RAT")
        PaymentSplitter(_teams, _share)
    {
        baseURI = _newBaseURI;
    }

    /**
     *    @notice Change the price of the mint
     *
     *    @param _priceSale is the new price you want to set
     **/
    function changePriceSale(uint256 _priceSale) external onlyOwner {
        priceSale = _priceSale;
    }

    /**
     *    @notice Change the number NFT max you can mint
     *
     *    @param _maxMintAllowed is the new max
     **/
    function changeMaxMintAllowed(uint256 _maxMintAllowed) external onlyOwner {
        max_mint_allowed = _maxMintAllowed;
    }

    /**
     *    @notice Return the baseURI of the NFT
     **/
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    /**
     *    @notice Change base URI
     *
     *    @param _newBaseURI is the new URI
     **/
    function setBaseUri(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    /**
     *   @notice Allows the mint of new NFT
     *
     *   @param _amount is the number of NFT you want to mint
     **/
    function mintNFT(uint256 _amount) external payable {
        uint256 numberNftSold = totalSupply();

        require(mintOpen, "mint phase is ended");
        require(priceSale * _amount <= msg.value, "Not enought funds");
        require(_amount <= max_mint_allowed, "You can mint more NFT");
        require(numberNftSold + _amount <= max_supply, "Max supply");
        require(
            nftBalance[msg.sender] + _amount <= max_mint_allowed,
            "Too much mint"
        );

        if (numberNftSold + _amount == max_supply) {
            mintOpen = false;
        }

        nftBalance[msg.sender] += _amount;
        for (uint256 i = 1; i <= _amount; i++) {
            _safeMint(msg.sender, numberNftSold + i);
        }
    }

    function tokenURI(uint256 _nftId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        _nftId.toString(),
                        baseExtension
                    )
                )
                : "";
    }
}
