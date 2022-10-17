// SPDX-Lincense-Identifier UNLICENSED 
pragma solidity ^0.8.15;

contract Transactions{
    // Number of transaction the user sends 
 uint256 transactionCount;

//  This will be an event that will be fired when a transaction is made
 event Transfer(address from, address receiver, uint amount, string message, 
 uint timestamp);

//Structure of the transaction that we will be storing on chain 
// when you make a transfer this will be inside it 
struct TransferStruct {
    address sender;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
}

// Array of transaction
// the variable name is transactions
TransferStruct[] transactions;

// function to add a transaction to the blockchain with our struct.

//payable keyword here means that the receiver is able to recieve ether from sender.

function addToBlockchain(address  payable receiver, uint amount, 
string memory message) public {
 transactionCount += 1;
 transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp ));

// trigger the event that  we created earlier 
 emit Transfer(msg.sender,  receiver, amount, message, block.timestamp);
}
// fuction to get all the transactions 
function getAllTransactions() public view returns (TransferStruct[] memory) {
    return transactions;
}

//  fuction to get the number of transactions.
function getTransactionCount() public view returns (uint256) {
    return transactionCount;
}
//  view keyword means that the function can only be used to view the data
//  therefore no ether is needed to run this function

}
