// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <8.10.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PayementSpliter.sol";

/// @title Contract RatRaceNFt
/// @author Julien Wolff Tristan Boettger
/// @notice This contract is an ERC721 was written as part of our final project alyra
contract RatRaceNFT is ERC721Enumerable, PaymentSplitter, Ownable {
    using Strings for uint256;

    enum State {
        Paused,
        Premint,
        Open,
        Finished
    }

    State public StateMint = State.Paused;

    uint256 public constant max_supply = 3333;

    uint256 public constant giftLimit = 33;

    uint256 public constant min_qty_mint_allowed = 1;

    uint256 public constant max_qty_mint_allowed = 6;

    uint256 public max_mint_allowed = 3;

    uint256 public constant priceMin = 1000000000 gwei;

    uint256 public constant priceMax = 5000000000 gwei;

    uint256 public priceSale = 1 ether;

    string public baseExtension = ".json";

    string public baseURI;

    mapping(address => uint256) public balanceOfNftMinted;

    /// events
    event PriceChange(uint256 oldPrice, uint256 newPrice);
    event MaxMintAllowedChange(uint256 oldMax, uint256 newMax);
    event BaseUriChange(string newUri);
    event MintStatus(State actualMintState);

    /// @dev The recommended format is as follows: "ipsf//:{your CID}"
    /// @param _newBaseURI indicate the URI of your NFT series
    constructor(
        string memory _newBaseURI,
        address[] memory _teams,
        uint256[] memory _share
    ) ERC721("RatRace", "RAT") PaymentSplitter(_teams, _share) {
        baseURI = _newBaseURI;
    }

    /// @notice turn state of the mint to premint and emit an event
    function setToPremint() external onlyOwner {
        require(
            StateMint != State.Finished && StateMint != State.Open,
            "Mint already open or finished"
        );
        StateMint = State.Premint;
        emit MintStatus(State.Premint);
    }

    /// @notice Open the Mint and emit an event
    function setMintOpen() external onlyOwner {
        require(StateMint != State.Finished, "Mint already finished");
        StateMint = State.Open;
        emit MintStatus(State.Open);
    }

    /// @notice Paused the Mint and emit an event
    function setMintPaused() external onlyOwner {
        require(StateMint != State.Paused, "Contract already paused");
        StateMint = State.Paused;
        emit MintStatus(State.Paused);
    }

    /**
     *    @dev You can add requirements to prevent the price from being too low or too expensive
     *
     *    @notice Change the price of the mint and emit an event
     *
     *    @param _priceSale is the new price you want to set
     */
    function changePriceSale(uint256 _priceSale) external onlyOwner {
        require(_priceSale >= priceMin, "this price is too low");
        require(_priceSale <= priceMax, "This price is above the limit");
        emit PriceChange(priceSale, _priceSale);
        priceSale = _priceSale;
    }

    /**
     *  @dev You can add requirements to prevent the _maxMintAllowed from being too low or too high
     *
     *  @notice Change the number NFT max you can mint and emit an event
     *
     *  @param _maxMintAllowed is the new max
     */
    function changeMaxMintAllowed(uint256 _maxMintAllowed) external onlyOwner {
        require(_maxMintAllowed >= min_qty_mint_allowed, "cannot be zero");
        require(_maxMintAllowed <= max_qty_mint_allowed, "must be 6 or lower");
        emit MaxMintAllowedChange(max_mint_allowed, _maxMintAllowed);
        max_mint_allowed = _maxMintAllowed;
    }

    /**
     *    @notice This function allows you to obtain the URI
     *
     *    @return the baseURI of the NFT
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    /**
     *    @dev Reminder: the recommended format is as follows: "ipsf//:{your CID}
     *
     *    @notice Change base URI
     *
     *    @param _newBaseURI is the new URI
     */
    function setBaseUri(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
        emit BaseUriChange(_newBaseURI);
    }

    /**
     *    @notice send a free nft to the indicated address
     *
     *    @param _to address where you want to send the nft gift
     */
    function gift(address _to) external onlyOwner {
        uint256 numberNftSold = totalSupply();
        require(StateMint == State.Premint, "We are not in the Premint phase");
        require(numberNftSold <= giftLimit, "giftLimit reached");
        _safeMint(_to, numberNftSold + 1);
    }

    /**
     *   @notice Allows the mint of new NFT
     *
     *   @param _amount is the number of NFT you want to mint
     */
    function mintNFT(uint256 _amount) external payable {
        uint256 numberNftSold = totalSupply();
        require(tx.origin == msg.sender, "Contract cannot call this function");
        require(StateMint == State.Open, "Mint is not open");
        require(priceSale * _amount <= msg.value, "Not enought funds");
        require(_amount <= max_mint_allowed, "You cant mint more NFT");
        require(
            balanceOfNftMinted[msg.sender] + _amount <= max_mint_allowed,
            "Too much mint"
        );
        require(numberNftSold + _amount <= max_supply, "Max supply");

        if (numberNftSold + _amount >= max_supply) {
            StateMint = State.Finished;
        }

        balanceOfNftMinted[msg.sender] += _amount;
        for (uint256 i = 1; i <= _amount; i++) {
            _safeMint(msg.sender, numberNftSold + i);
        }
    }

    /**
     *   @param _nftId id of the nft whose uri you want
     *
     *   @return the uri of the chosen nft
     */
    function tokenURI(uint256 _nftId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        require(_exists(_nftId), "id doesn't exist");
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
