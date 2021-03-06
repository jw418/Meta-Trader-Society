// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./RatRaceNFT.sol"; 

/**
*   @title Contract testTxOrigin
*   
*   @author Julien Wolff Tristan Boettger
*   
*   @notice this is a test contract. It tests the require tx.origin == msg.sender 
*   of the mintNFT function of our smart contract RatRaceNFT.sol 
*/
contract TestTxOrigin {    
    /** 
    *   @notice this fonction test a require in RatRaceNFT.sol  
    *
    *   @param _address addres du SC RatRaceNFT.sol
    *
    *   @param _amount qty to mint
    */
    function testMint(RatRaceNFT _address, uint256 _amount) external payable {        
       _address.mintNFT(_amount);
    }
}
