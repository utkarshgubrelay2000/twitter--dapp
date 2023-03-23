// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Twitter {
   // trsaction struct, ...
   // my trsactions
   // request trsact
   // send tracsation
   // my request
   // request for me
    mapping(address=>uint) public balances;
    struct Transaction{
        address from;
        address to;
        uint256 amount;
        uint date;
    }
    Transaction[] track;
function addFunds() public payable{
  balances[msg.sender]+=msg.value;
}


    event TrasactionDone(address to,address from,uint amount);

   function sendAmount(address to,uint amount) payable public {
 uint balce= balances[msg.sender];
 if(balce>amount){
 payable(to).transfer(amount);
 }
   } 




    
}
