PaymentSplitter : PaymentSplitter Modified

Functions

constructor
Name Type Description
payees address[]
shares\_ uint256[]
Returns:

No parameters

isTeam
Stock team addresses return a boolean

Name Type Description
address
Returns:

Name Type Description
bool
payee
Getter for the address of the payee number `index`.

Name Type Description
index uint256
Returns:

Name Type Description
address
release
Triggers a transfer to `account` of the amount of Ether they are owed, according to their percentage of the total shares and their previous withdrawals.

Name Type Description
account address
Returns:

No parameters

release
Triggers a transfer to `account` of the amount of Ether they are owed, according to their percentage of the total shares and their previous withdrawals.

Name Type Description
token address
account address
Returns:

No parameters

released
Getter for the amount of Ether already released to a payee.

Name Type Description
token address
account address
Returns:

Name Type Description
uint256
released
Getter for the amount of Ether already released to a payee.

Name Type Description
account address
Returns:

Name Type Description
uint256
shares
Getter for the amount of shares held by an account.

Name Type Description
account address
Returns:

Name Type Description
uint256
totalReleased
Getter for the total amount of Ether already released.

Name Type Description
token address
Returns:

Name Type Description
uint256
totalReleased
Getter for the total amount of Ether already released.

No parameters

Returns:

Name Type Description
uint256
totalShares
Getter for the total shares held by payees.

No parameters

Returns:

Name Type Description
uint256
undefined
**Add Documentation for the method here**

No parameters

Returns:

No parameters
