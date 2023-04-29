// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";
contract TwidCoin {
address owner;
mapping (address=>uint) public balances;
mapping (address=>uint) public coins;
uint256 public coinCost=1000000000.00;
mapping (address=>mapping (address=>bool)) public approval;
// explaination of this 
// address[([address]=20rs)] ==> [address][address]=20rs

constructor (address a){
owner=a;
}

modifier onlyOwner() {
    require(msg.sender == owner, "Only the contract owner can call this function.");
    _;
}

modifier checkApproval(address receiver) {
    // here we are checking where sender can have request
    console.log(receiver);
    require(approval[receiver][msg.sender]==true, " approval not found");
    _;
}

modifier checkBalance(uint256 amount) {
    // here we are checking where sender can have request
    console.log(amount);
    require(balances[msg.sender]>amount, " amount is less");
    _;
}

function transfer(address receiver,uint256 amount) checkApproval(receiver) checkBalance(amount) public payable{
    balances[msg.sender] -= amount;
    balances[receiver] += amount;
}

function buyCoin(uint256 amount) checkBalance(amount) public payable{
    balances[msg.sender] -= amount;
   balances[owner] += amount;
   coins[msg.sender]+=amount/coinCost;
    console.log(amount/coinCost,coins[msg.sender]);
}

function myCoinAndValue() public view returns(uint256,uint256){
   
return (coins[msg.sender], coins[msg.sender]*coinCost);
}
function setCoinCost(uint256 value) onlyOwner public{
    coinCost=value;
}


function toggleApprovel(address receiver)  public {
    approval[receiver][msg.sender]=!approval[receiver][msg.sender];
}


function seeToggle(address receiver) view  public returns(bool){
    return approval[receiver][msg.sender];
}

function getOwner()public view returns(address){
    return owner;
}

function withdraw(uint256 amount)public payable{
    payable(msg.sender).call{value:amount};
}

 function addFunds() public payable {
        balances[msg.sender] += msg.value;
    }
    function getBalance() public view returns(uint256) {
      return  balances[msg.sender] ;
    }



}


