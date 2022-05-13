
## RatRaceNFT : Contract RatRaceNFt

This contract is an ERC721 was written as part of our final project alyra

Author: Julien Wolff Tristan Boettger

  

**Functions**

* * *

###### constructor

The recommended format is as follows: "ipsf//:{your CID}"

 **Name**    | **Type** | **Description**                     
-------------|----------|-------------------------------------
 _newBaseURI | string   | indicate the URI of your NFT series 



Returns:

No parameters

* * *

###### approve

See {IERC721-approve}.

| Name    | Type    | Description |
|---------|---------|-------------|
| to      | address |
| tokenId | uint256 |


Returns:

No parameters

* * *

###### balanceOf

See {IERC721-balanceOf}.

| Name  | Type    | Description |
|-------|---------|-------------|
| owner | address |

Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |



* * *

###### baseExtension

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

| Name | Type   | Description |
|------|--------|-------------|
|      | string |             |


* * *

###### baseURI

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

| Name | Type   | Description |
|------|--------|-------------|
|      | string |             |


* * *

###### changeMaxMintAllowed

You can add requirements to prevent the \_maxMintAllowed from being too low or too high

| Name            | Type    | Description         |
|-----------------|---------|---------------------|
| _maxMintAllowed | uint256 | is the new max      |


Returns:

No parameters

* * *

###### changePriceSale

You can add requirements to prevent the price from being too low or too expensive

| Name       | Type    | Description                         |
|------------|---------|-------------------------------------|
| _priceSale | uint256 | is the new price you want to set    |


Returns:

No parameters

* * *

###### getApproved

See {IERC721-getApproved}.

| Name    | Type    | Description |
|---------|---------|-------------|
| tokenId | uint256 |


Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | address |             |


* * *

###### isApprovedForAll

See {IERC721-isApprovedForAll}.

| Name     | Type    | Description |
|----------|---------|-------------|
| owner    | address |
| operator | address |


Returns:

| Name | Type | Description |
|------|------|-------------|
|      | bool |             |


* * *

###### isTeam

**\*\*Add Documentation for the method here\*\***

| Name | Type    | Description |
|------|---------|-------------|
|      | address |             |


Returns:

| Name | Type | Description |
|------|------|-------------|
|      | bool |             |


* * *

###### max\_mint\_allowed

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |


* * *

###### max\_supply

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:
| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |


* * *

###### mintNFT

| Name    | Type    | Description                           |
|---------|---------|---------------------------------------|
| _amount | uint256 | is the number of NFT you want to mint |

Returns:

No parameters

* * *

###### mintOpen

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

| Name | Type | Description |
|------|------|-------------|
|      | bool |             |


* * *

###### name

See {IERC721Metadata-name}.

No parameters

Returns:

| Name | Type   | Description |
|------|--------|-------------|
|      | string |             |


* * *

###### nftBalance

**\*\*Add Documentation for the method here\*\***

| Name | Type    | Description |
|------|---------|-------------|
|      | address |             |

Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |


* * *

###### owner

Returns the address of the current owner.

No parameters

Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | address |             |


* * *

###### ownerOf

See {IERC721-ownerOf}.

| Name    | Type    | Description |
|---------|---------|-------------|
| tokenId | uint256 |


Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | address |             |


* * *

###### payee

Getter for the address of the payee number \`index\`.

| Name  | Type    | Description |
|-------|---------|-------------|
| index | uint256 |


Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | address |             |


* * *

###### priceSale

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |


* * *

###### release

Triggers a transfer to \`account\` of the amount of Ether they are owed, according to their percentage of the total shares and their previous withdrawals.

| Name    | Type    | Description |
|---------|---------|-------------|
| account | address |


Returns:

No parameters

* * *

###### release

Triggers a transfer to \`account\` of the amount of Ether they are owed, according to their percentage of the total shares and their previous withdrawals.

Name

| Name    | Type    | Description |
|---------|---------|-------------|
| token   | address |
| account | address |


Returns:

No parameters

* * *

###### released

Getter for the amount of Ether already released to a payee.

| Name    | Type    | Description |
|---------|---------|-------------|
| token   | address |
| account | address |


Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |


* * *

###### released

Getter for the amount of Ether already released to a payee.

| Name    | Type    | Description |
|---------|---------|-------------|
| account | address |

Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |


* * *

###### renounceOwnership

Leaves the contract without owner. It will not be possible to call \`onlyOwner\` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.

No parameters

Returns:

No parameters

* * *

###### safeTransferFrom

See {IERC721-safeTransferFrom}.

| Name    | Type    | Description |
|---------|---------|-------------|
| from    | address |
| to      | address |
| tokenId | uint256 |


Returns:

No parameters

* * *

###### safeTransferFrom

See {IERC721-safeTransferFrom}.

| Name    | Type    | Description |
|---------|---------|-------------|
| from    | address |
| to      | address |
| tokenId | uint256 |
| _data   | bytes   |


Returns:

No parameters

* * *

###### setApprovalForAll

See {IERC721-setApprovalForAll}.

| Name     | Type    | Description |
|----------|---------|-------------|
| operator | address |
| approved | bool    |


Returns:

No parameters

* * *

###### setBaseUri

Reminder: the recommended format is as follows: "ipsf//:{your CID}

| Name        | Type   | Description    |
|-------------|--------|----------------|
| _newBaseURI | string | is the new URI |


Returns:

No parameters

* * *

###### shares

Getter for the amount of shares held by an account.

| Name    | Type    | Description |
|---------|---------|-------------|
| account | address |


Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |


* * *

###### supportsInterface

See {IERC165-supportsInterface}.

| Name        | Type   | Description |
|-------------|--------|-------------|
| interfaceId | bytes4 |


Returns:

| Name | Type | Description |
|------|------|-------------|
|      | bool |             |


* * *

###### symbol

See {IERC721Metadata-symbol}.

No parameters

Returns:

| Name | Type   | Description |
|------|--------|-------------|
|      | string |             |


* * *

###### tokenByIndex

See {IERC721Enumerable-tokenByIndex}.

| Name  | Type    | Description |
|-------|---------|-------------|
| index | uint256 |


Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |


* * *

###### tokenOfOwnerByIndex

See {IERC721Enumerable-tokenOfOwnerByIndex}.

| Name  | Type    | Description |
|-------|---------|-------------|
| owner | address |
| index | uint256 |


Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |

* * *

###### tokenURI

| Name   | Type    | Description                      |
|--------|---------|----------------------------------|
| _nftId | uint256 | id of the nft whose uri you want |


Returns:

| Name | Type   | Description |
|------|--------|-------------|
|      | string |             |


* * *

###### totalReleased

Getter for the total amount of Ether already released.

| Name  | Type    | Description |
|-------|---------|-------------|
| token | address |


Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |


* * *

###### totalReleased

Getter for the total amount of Ether already released.

No parameters

Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |


* * *

###### totalShares

Getter for the total shares held by payees.

No parameters

Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |

* * *

###### totalSupply

See {IERC721Enumerable-totalSupply}.

No parameters

Returns:

| Name | Type    | Description |
|------|---------|-------------|
|      | uint256 |             |


* * *

###### transferFrom

See {IERC721-transferFrom}.

| Name    | Type    | Description |
|---------|---------|-------------|
| from    | address |
| to      | address |
| tokenId | uint256 |


Returns:

No parameters

* * *

###### transferOwnership

Transfers ownership of the contract to a new account (\`newOwner\`). Can only be called by the current owner.

| Name     | Type    | Description |
|----------|---------|-------------|
| newOwner | address |

Returns:

No parameters

* * *

###### undefined

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

No parameters
