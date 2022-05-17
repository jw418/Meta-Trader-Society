    #ethdoc-viewer{ font-size: 0.8em; padding: 1em; } #ethdoc-viewer .lead{ font-size: 1em; } #ethdoc-viewer table { width: 50%; } #ethdoc-viewer hr { margin: 0; margin-bottom: 0.5rem; } #ethdoc-viewer p{ margin-bottom: 0.5rem; }

### PaymentSplitter : PaymentSplitter Modified

This is the smart contract of OppenZeppelin PayementSpliter.sol to which we have added a modifier isTeam

  

**Functions**

* * *

###### constructor

\[object Object\]

Name

Type

Description

payees

address\[\]

array of addresses to be paid

shares\_

uint256\[\]

arrays of the distribution of payments

Returns:

No parameters

* * *

###### isTeam

**\*\*Add Documentation for the method here\*\***

Name

Type

Description

address

Returns:

Name

Type

Description

bool

* * *

###### payee

Name

Type

Description

index

uint256

an index of the payee array

Returns:

Name

Type

Description

address

* * *

###### release

Triggers a transfer to \`account\` of the amount of Ether they are owed, according to their percentage of the total shares and their previous withdrawals.

Name

Type

Description

account

address

account to released

Returns:

No parameters

* * *

###### release

Triggers a transfer to \`account\` of the amount of Ether they are owed, according to their percentage of the total shares and their previous withdrawals.

Name

Type

Description

token

address

account

address

account to released

Returns:

No parameters

* * *

###### released

Name

Type

Description

token

address

account

address

the account to be queried

Returns:

Name

Type

Description

uint256

* * *

###### released

Name

Type

Description

account

address

the account to be queried

Returns:

Name

Type

Description

uint256

* * *

###### shares

Name

Type

Description

account

address

account to be queried

Returns:

Name

Type

Description

uint256

* * *

###### totalReleased

Name

Type

Description

token

address

Returns:

Name

Type

Description

uint256

* * *

###### totalReleased

No parameters

Returns:

Name

Type

Description

uint256

* * *

###### totalShares

No parameters

Returns:

Name

Type

Description

uint256

* * *

###### undefined

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

No parameters